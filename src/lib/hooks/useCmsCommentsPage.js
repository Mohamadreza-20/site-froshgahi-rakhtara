import { useMemo } from "react";
import { useCommentsQuery } from "./cms/useCommentsQueries";
import { useProducts } from "./useProducts";
import { useCommentsPageState } from "./cms/useCommentsPageState";
import { useCommentsStats } from "./cms/useCommentsStats";
import { useCommentAdminActions } from "./cms/useCommentAdminActions";

export default function useCmsCommentsPage() {
  const commentsQuery = useCommentsQuery();
  const productsQuery = useProducts({ limit: 100 });
  const comments = commentsQuery.data || [];
  const productNameMap = useMemo(() => new Map(productsQuery.products.map((product) => [String(product.id), product.name])), [productsQuery.products]);
  const state = useCommentsPageState(comments, productNameMap);
  const stats = useCommentsStats(comments);
  const actions = useCommentAdminActions({ deletingComment: state.deletingComment, setDeletingComment: state.setDeletingComment });
  const handleSearchChange = (event) => { state.setQuery(event.target.value); state.setCurrentPage(1); };
  return {
    query: state.query, currentPage: state.currentPage, deletingComment: state.deletingComment, comments,
    paginated: state.paginated, productNameMap, stats, totalPages: state.totalPages, safePage: state.safePage,
    isLoading: commentsQuery.isLoading || productsQuery.loading,
    isFetching: commentsQuery.isFetching,
    isError: commentsQuery.isError || Boolean(productsQuery.error),
    deletePending: actions.deletePending,
    refetchAll: () => { void commentsQuery.refetch(); void productsQuery.refetch(); },
    handleSearchChange, setCurrentPage: state.setCurrentPage, setDeletingComment: state.setDeletingComment,
    handleDelete: actions.handleDelete,
  };
}
