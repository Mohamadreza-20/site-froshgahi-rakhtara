import { EmptyState, QueryErrorState, QueryLoadingState } from "../components/shared/states/QueryStates";
import { PageHeader, ConfirmDialog } from "../components/cms/ui";
import CommentsStats from "../components/cms/features/comments/CommentsStats";
import CommentsTable from "../components/cms/features/comments/CommentsTable";
import CommentsSearch from "../components/cms/features/comments/CommentsSearch";
import useCmsCommentsPage from "../lib/hooks/useCmsCommentsPage";

export default function CmsComments() {
  const state = useCmsCommentsPage();

  if (state.isLoading) return <QueryLoadingState message="در حال بارگذاری نظرات..." />;
  if (state.isError) return <QueryErrorState message="دریافت نظرات ناموفق بود" onRetry={state.refetchAll} />;
  if (!state.comments.length && !state.query) {
    return (
      <div className="space-y-6">
        <PageHeader title="نظرات مشتریان" actionLabel={state.isFetching ? "در حال بروزرسانی…" : "بروزرسانی"} onAction={state.refetchAll} />
        <CommentsStats total={0} {...state.stats} />
        <EmptyState title="هنوز نظری ثبت نشده است" description="با ثبت اولین نظر مشتری، نظرات در این بخش نمایش داده می‌شوند." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="نظرات مشتریان" actionLabel={state.isFetching ? "در حال بروزرسانی…" : "بروزرسانی"} onAction={state.refetchAll} />
      <CommentsStats total={state.comments.length} {...state.stats} />
      <CommentsSearch value={state.query} onChange={state.handleSearchChange} />
      {state.paginated.length ? (
        <CommentsTable
          comments={state.paginated}
          productNameMap={state.productNameMap}
          currentPage={state.safePage}
          totalPages={state.totalPages}
          onPageChange={state.setCurrentPage}
          onDelete={state.setDeletingComment}
        />
      ) : (
        <EmptyState title="نظری با این مشخصات پیدا نشد" description="عبارت جستجو را تغییر دهید و دوباره امتحان کنید." />
      )}
      <ConfirmDialog
        open={Boolean(state.deletingComment)}
        onClose={() => !state.deletePending && state.setDeletingComment(null)}
        onConfirm={state.handleDelete}
        loading={state.deletePending}
        title="حذف نظر"
        description={state.deletingComment ? `آیا از حذف نظر «${state.deletingComment.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.` : ""}
      />
    </div>
  );
}
