import { useMemo } from "react";
import { PageHeader } from "../components/cms/ui";
import DashboardStats from "../components/cms/features/dashboard/DashboardStats";
import DashboardSections from "../components/cms/features/dashboard/DashboardSections";
import { QueryErrorState, QueryLoadingState } from "../components/shared/states/QueryStates";
import { statCardIcons } from "../lib/data/mockData";
import { useUsersQuery } from "../lib/hooks/cms/useUsersQueries";
import { useCommentsQuery } from "../lib/hooks/cms/useCommentsQueries";
import { useProducts } from "../lib/hooks/useProducts";
import { usePageMeta } from "../lib/hooks/usePageMeta";

export default function Dashboard() {
  usePageMeta({ title: "داشبورد مدیریت | Rakhtara", description: "داشبورد مدیریت فروشگاه Rakhtara و نمای کلی کاربران، محصولات و نظرات.", path: "/dashboard/home", robots: "noindex, nofollow" });
  const usersQuery = useUsersQuery();
  const commentsQuery = useCommentsQuery();
  const productsQuery = useProducts({ limit: 100 });
  const users = usersQuery.data ?? [];
  const comments = commentsQuery.data ?? [];
  const products = productsQuery.products;
  const loading = usersQuery.isLoading || commentsQuery.isLoading || productsQuery.loading;
  const error = usersQuery.error || commentsQuery.error || productsQuery.error;
  const counts = useMemo(() => ({
    users: users.length,
    products: productsQuery.total || products.length,
    comments: comments.length,
    managers: users.filter((user) => user.role === "مدیر فروشگاه").length,
  }), [comments.length, products.length, productsQuery.total, users]);

  const retry = () => {
    void usersQuery.refetch();
    void commentsQuery.refetch();
    void productsQuery.refetch();
  };

  if (loading) return <QueryLoadingState message="در حال بارگذاری داشبورد..." />;
  if (error) return <QueryErrorState message="دریافت اطلاعات داشبورد ناموفق بود" onRetry={retry} />;

  return (
    <div className="space-y-6">
      <PageHeader title="داشبورد" />
      <DashboardStats counts={counts} icons={statCardIcons} />
      <DashboardSections />
    </div>
  );
}
