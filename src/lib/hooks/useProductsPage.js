import { useEffect, useMemo, useState } from "react";
import { useCategories } from "./useCategories";
import { STORAGE_KEYS } from "../storageKeys";
import { usePersistentState } from "./usePersistentState";
import { useProducts } from "./useProducts";
import { useProductPageActions } from "./useProductPageActions";
import { useDebouncedValue } from "./useDebouncedValue";

const PAGE_SIZE = 6;
const VIEW_STORAGE_KEY = STORAGE_KEYS.productsView;
const CATEGORY_STORAGE_KEY = STORAGE_KEYS.productsCategoryFilter;
const QUERY_STORAGE_KEY = STORAGE_KEYS.productsQuery;
const DEFAULT_MANUAL_FILTERS = { minPrice: "", maxPrice: "", stockFilter: "all" };

export function useProductsPage() {
  const { categories } = useCategories();
  const validCategories = useMemo(() => ["همه", ...categories.map((category) => category.name)], [categories]);
  const [query, setQuery] = usePersistentState(QUERY_STORAGE_KEY, "");
  const [activeCategory, setActiveCategory] = usePersistentState(
    CATEGORY_STORAGE_KEY,
    "همه",
    (value) => validCategories.includes(value),
  );
  useEffect(() => {
    if (!validCategories.includes(activeCategory)) setActiveCategory("همه");
  }, [activeCategory, validCategories, setActiveCategory]);

  const [view, setView] = usePersistentState(VIEW_STORAGE_KEY, "grid", (value) => value === "grid" || value === "table");
  const [manualFilters, setManualFilters] = useState(DEFAULT_MANUAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const actions = useProductPageActions();

  const debouncedQuery = useDebouncedValue(query, 450);
  const debouncedActiveCategory = useDebouncedValue(activeCategory, 450);
  const debouncedManualFilters = useDebouncedValue(manualFilters, 450);

  const productsQuery = useProducts({
    page: currentPage,
    limit: PAGE_SIZE,
    category: debouncedActiveCategory === "همه" ? "all" : debouncedActiveCategory,
    search: debouncedQuery,
    minPrice: debouncedManualFilters.minPrice,
    maxPrice: debouncedManualFilters.maxPrice,
    stockFilter: debouncedManualFilters.stockFilter,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, debouncedManualFilters, debouncedActiveCategory]);

  const changeFilter = (setter) => (value) => setter(value);

  const updateManualFilter = (key, value) => {
    setManualFilters((current) => ({ ...current, [key]: value }));
  };

  const resetManualFilters = () => setManualFilters(DEFAULT_MANUAL_FILTERS);

  const filterSummary = useMemo(() => {
    const parts = [];
    if (debouncedQuery.trim()) parts.push(`جستجو: ${debouncedQuery.trim()}`);
    if (debouncedActiveCategory !== "همه") parts.push(`دسته: ${debouncedActiveCategory}`);
    if (debouncedManualFilters.minPrice) parts.push(`حداقل قیمت: ${debouncedManualFilters.minPrice}`);
    if (debouncedManualFilters.maxPrice) parts.push(`حداکثر قیمت: ${debouncedManualFilters.maxPrice}`);
    if (debouncedManualFilters.stockFilter !== "all") parts.push("فیلتر موجودی فعال است");
    return parts;
  }, [debouncedQuery, debouncedManualFilters, debouncedActiveCategory]);

  return {
    pageSize: PAGE_SIZE,
    query,
    setQuery: changeFilter(setQuery),
    activeCategory,
    setActiveCategory: changeFilter(setActiveCategory),
    manualFilters,
    updateManualFilter,
    resetManualFilters,
    hasManualFilters: manualFilters.minPrice !== "" || manualFilters.maxPrice !== "" || manualFilters.stockFilter !== "all",
    filterSummary,
    view,
    setView,
    currentPage,
    setCurrentPage,
    products: productsQuery.products,
    total: productsQuery.total,
    totalPages: productsQuery.totalPages,
    loading: productsQuery.loading,
    fetching: productsQuery.fetching,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
    lowStock: productsQuery.products.filter((product) => product.stock > 0 && product.stock <= 6).length,
    outOfStock: productsQuery.products.filter((product) => product.stock === 0).length,
    ...actions,
  };
}
