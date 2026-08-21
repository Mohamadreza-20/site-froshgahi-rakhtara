import { EmptyState, QueryErrorState, QueryLoadingState } from "../shared/states/QueryStates";
import CommentForm from "./product-comments/CommentForm";
import CommentsList from "./product-comments/CommentsList";
import CommentsLoadMore from "./product-comments/CommentsLoadMore";
import ProductCommentsHeader from "./product-comments/ProductCommentsHeader";
import useProductComments from "../../lib/hooks/useProductComments";

export default function ProductComments({ productId }) {
  const state = useProductComments(productId);
  const updateForm = (key, value) => state.setForm((previous) => ({ ...previous, [key]: value }));

  return (
    <section className="mb-20" aria-labelledby="product-comments-title">
      <ProductCommentsHeader average={state.avgRating} count={state.comments.length} />

      {state.isLoading ? <QueryLoadingState message="در حال بارگذاری نظرات..." /> : null}
      {state.isError ? <QueryErrorState message="دریافت نظرات ناموفق بود" onRetry={state.refetch} /> : null}
      {!state.isLoading && !state.isError && state.comments.length === 0 ? <EmptyState title="هنوز نظری برای این محصول ثبت نشده است" description="اولین نفری باشید که نظر می‌دهد!" /> : null}
      {!state.isLoading && !state.isError && state.comments.length > 0 ? <CommentsList comments={state.visibleComments} newCommentId={state.newCommentId} /> : null}

      {state.comments.length > state.pageSize ? (
        <CommentsLoadMore
          remaining={state.remaining}
          pageSize={state.pageSize}
          showComplete={true}
          onLoadMore={() => state.setVisibleCount((count) => Math.min(count + state.pageSize, state.comments.length))}
        />
      ) : null}

      <CommentForm
        name={state.form.name}
        text={state.form.text}
        rating={state.form.rating}
        hoverRating={state.form.hoverRating}
        pending={state.pending}
        onNameChange={(event) => updateForm("name", event.target.value)}
        onTextChange={(event) => updateForm("text", event.target.value)}
        onRatingChange={(rating) => updateForm("rating", rating)}
        onHoverChange={(hoverRating) => updateForm("hoverRating", hoverRating)}
        onSubmit={state.submit}
      />
    </section>
  );
}
