import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCommentsMutations, useCommentsQuery } from "./cms/useCommentsQueries";

const PAGE_SIZE = 5;

export default function useProductComments(productId) {
  const { data: allComments = [], isLoading, isError, refetch } = useCommentsQuery();
  const { createComment } = useCommentsMutations();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [newCommentId, setNewCommentId] = useState(null);
  const [form, setForm] = useState({ name: "", text: "", rating: 5, hoverRating: 0 });

  const comments = useMemo(
    () => allComments.filter((comment) => String(comment.productId) === String(productId)).reverse(),
    [allComments, productId],
  );

  const visibleComments = comments.slice(0, visibleCount);
  const avgRating = comments.length
    ? comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0) / comments.length
    : 0;
  const remaining = Math.max(0, comments.length - visibleCount);

  async function submit(event) {
    event.preventDefault();
    const name = form.name.trim();
    const text = form.text.trim();
    if (!name || !text) return;

    try {
      const created = await createComment.mutateAsync({ productId, name, text, rating: form.rating });
      setForm({ name: "", text: "", rating: 5, hoverRating: 0 });
      setVisibleCount((count) => Math.max(count, PAGE_SIZE));
      setNewCommentId(created.id);
      window.setTimeout(() => setNewCommentId(null), 1600);
      toast.success("نظر شما با موفقیت ثبت شد");
    } catch (error) {
      toast.error(error?.userMessage || "ثبت نظر ناموفق بود، دوباره تلاش کنید");
    }
  }

  return {
    comments,
    visibleComments,
    avgRating,
    remaining,
    hasMore: remaining > 0,
    isLoading,
    isError,
    refetch,
    newCommentId,
    pending: createComment.isPending,
    form,
    setForm,
    setVisibleCount,
    submit,
    pageSize: PAGE_SIZE,
  };
}
