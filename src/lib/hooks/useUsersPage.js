import { useMemo, useState } from "react";
import { useUsersQuery } from "./cms/useUsersQueries";
import { useUserPageActions } from "./useUserPageActions";
import { useDebouncedValue } from "./useDebouncedValue";

const PAGE_SIZE = 10;

function normalizeText(value) {
  return String(value ?? "").trim().toLocaleLowerCase("fa-IR");
}

function matchesUser(user, query) {
  const term = normalizeText(query);
  if (!term) return true;
  return normalizeText([
    user.name,
    user.email,
    user.phone,
    user.role,
    user.status,
    user.joined,
  ].join(" ")).includes(term);
}

export function useUsersPage() {
  const [query, setQueryState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const actions = useUserPageActions();
  const debouncedQuery = useDebouncedValue(query, 450);
  const { data: rawUsers = [], isLoading, isFetching, error, refetch } = useUsersQuery();
  const users = useMemo(
    () => (Array.isArray(rawUsers) ? rawUsers : []).filter((user) => matchesUser(user, debouncedQuery)),
    [rawUsers, debouncedQuery],
  );

  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(
    () => users.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [users, safePage],
  );
  const stats = useMemo(
    () => users.reduce(
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
    filteredCount: users.length,
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
