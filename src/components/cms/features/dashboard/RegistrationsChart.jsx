import { useMemo } from "react";
import { QueryErrorState, QueryLoadingState } from "../../../shared/states/QueryStates";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartTooltip } from "../../ui";
import { useUsersQuery } from "../../../../lib/hooks/cms/useUsersQueries";
import { useProducts } from "../../../../lib/hooks/useProducts";

export default function RegistrationsChart() {
  const usersQuery = useUsersQuery();
  const productsQuery = useProducts({ limit: 100 });
  const data = useMemo(() => {
    const users = usersQuery.data ?? [];
    return [
      { label: "مشتری", value: users.filter((user) => user.role === "مشتری").length },
      { label: "پشتیبانی", value: users.filter((user) => user.role === "پشتیبانی").length },
      { label: "مدیر فروشگاه", value: users.filter((user) => user.role === "مدیر فروشگاه").length },
      { label: "محصولات", value: productsQuery.total || productsQuery.products.length },
    ];
  }, [productsQuery.products.length, productsQuery.total, usersQuery.data]);
  const loading = usersQuery.isLoading || productsQuery.loading;
  const error = usersQuery.error || productsQuery.error;
  const retry = () => { void usersQuery.refetch(); void productsQuery.refetch(); };

  return <div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
    <div className="flex items-center justify-between mb-6"><span className="text-sm text-[#6B7280] font-medium">کاربران ثبت‌نامی و محصولات</span><h3 className="font-bold text-lg text-[#111827]">آمار کلی داشبورد</h3></div>
    <div className="h-72 w-full" dir="ltr">
      {loading ? <div className="h-full"><QueryLoadingState message="در حال بارگذاری آمار..." skeleton /></div> : error ? <QueryErrorState message="دریافت آمار ناموفق بود" onRetry={retry} /> : <ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap="35%"><CartesianGrid strokeDasharray="3 3" stroke="#F1F2F6" vertical={false} /><XAxis dataKey="label" reversed tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={{ stroke: "#EEF0F5" }} tickLine={false} /><YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} /><Tooltip cursor={{ fill: "#F7F8FB" }} content={<ChartTooltip />} /><Bar dataKey="value" fill="#6C63FF" radius={[8, 8, 0, 0]} maxBarSize={64} /></BarChart></ResponsiveContainer>}
    </div>
  </div>;
}
