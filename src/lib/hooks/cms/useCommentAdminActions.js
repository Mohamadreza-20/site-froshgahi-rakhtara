import { toast } from "sonner";
import { useCommentsMutations } from "./useCommentsQueries";
export function useCommentAdminActions({ deletingComment, setDeletingComment }) {
  const { deleteComment } = useCommentsMutations();
  const handleDelete = async () => {
    if (!deletingComment) return;
    try { await deleteComment.mutateAsync(deletingComment.id); toast.success("نظر با موفقیت حذف شد"); setDeletingComment(null); }
    catch (error) { toast.error(error?.userMessage || "حذف نظر با خطا مواجه شد"); }
  };
  return { handleDelete, deletePending: deleteComment.isPending };
}
