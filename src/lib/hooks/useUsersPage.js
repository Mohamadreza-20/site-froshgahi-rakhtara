import { useMemo, useState } from "react";
import { useUsersQuery } from "./cms/useUsersQueries";
import { useUserPageActions } from "./useUserPageActions";

const PAGE_SIZE = 10;

export function useUsersPage() {
  const [query, setQueryState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const actions = useUserPageActions();
  const { data: users = [], isLoading, isFetching, error, refetch } = useUsersQuery();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return users;
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(normalized) ||
        user.email?.toLowerCase().includes(normalized),
    );
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  );
  const stats = useMemo(
    () =>
      users.reduce(
        (result, user) => {
          if (user.status === "فعال") result.activeCount += 1;
          if (user.role === "مدیر فروشگاه") result.managerCount += 1;
          if (user.role === "پشتیبانی") result.supportCount += 1;
          return result;
        },
        { activeCount: 0, managerCount: 0, supportCount: 0 },
      ),
    [users],
  );

  const setQuery = (value) => {
    setQueryState(value);
    setCurrentPage(1);
  };

  return {
    users,
    paginated,
    filteredCount: filtered.length,
    query,
    setQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    safePage,
    stats,
    loading: isLoading,
    fetching: isFetching,
    error,
    refetch,
    ...actions,
    resetToFirstPage: () => setCurrentPage(1),
  };
}
