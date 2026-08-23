import { PageHeader, StatCard, ConfirmDialog } from "../components/cms/ui";
import UsersTable from "../components/cms/features/users/UsersTable";
import UserFormModal from "../components/cms/features/users/UserFormModal";
import { QueryErrorState, QueryLoadingState } from "../components/shared/states/QueryStates";
import { useUsersPage } from "../lib/hooks/useUsersPage";

export default function Users() {
  const state = useUsersPage();
  return <div className="space-y-6" aria-busy={state.fetching}>
    <PageHeader title="کاربران" actionLabel="کاربر جدید" onAction={state.openCreateModal} />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"><StatCard label="مجموع کاربران" value={state.users.length} /><StatCard label="کاربران فعال" value={state.stats.activeCount} valueClassName="text-[#16A34A]" /><StatCard label="مدیران فروشگاه" value={state.stats.managerCount} valueClassName="text-[#C026D3]" /><StatCard label="اعضای پشتیبانی" value={state.stats.supportCount} valueClassName="text-[#EA580C]" /></div>
    {state.loading ? (
      <QueryLoadingState message="در حال بارگذاری کاربران..." />
    ) : state.error ? (
      <QueryErrorState message="خطا در دریافت کاربران" onRetry={state.refetch} />
    ) : (
      <UsersTable users={state.paginated} totalCount={state.filteredCount} query={state.query} onQueryChange={state.setQuery} onEdit={state.openEditModal} onDelete={state.setDeletingUser} newUserId={state.newUserId} currentPage={state.safePage} totalPages={state.totalPages} onPageChange={state.setCurrentPage} />
    )}
    <UserFormModal open={state.isModalOpen} onClose={state.closeModal} onSubmit={(form) => state.submitUser(form, state.resetToFirstPage)} user={state.editingUser} submitting={state.submitting} />
    <ConfirmDialog open={Boolean(state.deletingUser)} onClose={() => !state.deleting && state.setDeletingUser(null)} onConfirm={state.deleteSelectedUser} loading={state.deleting} title="حذف کاربر" description={state.deletingUser ? `آیا از حذف «${state.deletingUser.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.` : ""} />
  </div>;
}
