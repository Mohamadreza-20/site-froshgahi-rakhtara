import OptimizedImage from "../../../shared/OptimizedImage";
import { ArrowLeft } from "lucide-react";
import { QueryErrorState, QueryLoadingState, EmptyState } from "../../../shared/states/QueryStates";
import { useNavigate } from "react-router-dom";
import { StatusPill, RoleBadge } from "../../ui";
import { useUsersQuery } from "../../../../lib/hooks/cms/useUsersQueries";
import { getAvatarUrl } from "../../../../utils/avatar";

export default function RecentUsers() {
  const navigate = useNavigate();
  const { data: users = [], isLoading, isError, refetch } = useUsersQuery();
  const recentUsers = [...users].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 5);
  return <div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
    <div className="flex items-center justify-between mb-5">
      <button type="button" onClick={() => navigate("/dashboard/users")} className="cursor-pointer flex items-center gap-1 text-xs font-medium text-[#6C63FF] hover:text-[#4F46E5] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/30 rounded">مشاهده همه <ArrowLeft size={13} aria-hidden="true" /></button>
      <h3 className="font-bold text-[#111827]">۵ کاربر آخر</h3>
    </div>
    {isLoading ? <QueryLoadingState message="در حال بارگذاری کاربران..." skeleton /> : isError ? <QueryErrorState message="دریافت کاربران ناموفق بود" onRetry={refetch} /> : !recentUsers.length ? <EmptyState title="کاربری یافت نشد" /> : <div className="flex flex-col divide-y divide-[#F5F6FA]">
      {recentUsers.map((user) => <div key={user.id || user.email} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
        <div className="text-left"><StatusPill status={user.status} /><div className="text-xs text-[#9CA3AF] mt-1 tabular-nums">{user.joined}</div></div>
        <div className="flex items-center gap-3"><div className="text-right"><div className="text-sm font-medium text-[#111827]">{user.name}</div><RoleBadge role={user.role} /></div><OptimizedImage src={getAvatarUrl(user.seed || user.name)} alt="" className="w-10 h-10 rounded-full bg-[#EEF0FF] shrink-0" /></div>
      </div>)}
    </div>}
  </div>;
}
