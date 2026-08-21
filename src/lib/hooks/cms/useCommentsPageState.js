import { useMemo, useState } from "react";
export function useCommentsPageState(comments, productNameMap) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingComment, setDeletingComment] = useState(null);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return comments;
    return comments.filter((comment) => [comment.name, comment.text, productNameMap.get(String(comment.productId)) || ""].some((value) => value?.toLowerCase().includes(normalized)));
  }, [comments, productNameMap, query]);
  const PAGE_SIZE = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE), [filtered, safePage]);
  return { query, setQuery, currentPage, setCurrentPage, deletingComment, setDeletingComment, filtered, paginated, totalPages, safePage, PAGE_SIZE };
}
