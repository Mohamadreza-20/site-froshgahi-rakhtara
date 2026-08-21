import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, getAllComments } from "../../../services/comments";
import { queryKeys } from "../../queryKeys";

export const commentsQueryKey = queryKeys.comments.all;

export function useCommentsQuery(options = {}) {
  return useQuery({ queryKey: commentsQueryKey, queryFn: getAllComments, ...options });
}

export function useCommentsMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: commentsQueryKey });
  return {
    createComment: useMutation({ mutationFn: createComment, onSuccess: invalidate }),
    deleteComment: useMutation({ mutationFn: deleteComment, onSuccess: invalidate }),
  };
}
