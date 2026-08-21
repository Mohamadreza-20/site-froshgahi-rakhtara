import { useState } from "react";
import { CATEGORIES } from "../data/products";
import { STORAGE_KEYS } from "../storageKeys";
import { usePersistentState } from "./usePersistentState";
import { useProducts } from "./useProducts";
import { useProductPageActions } from "./useProductPageActions";

const PAGE_SIZE = 6;
const VIEW_STORAGE_KEY = STORAGE_KEYS.productsView;
const CATEGORY_STORAGE_KEY = STORAGE_KEYS.productsCategoryFilter;
const QUERY_STORAGE_KEY = STORAGE_KEYS.productsQuery;
const VALID_CATEGORIES = ["همه", ...CATEGORIES.map((category) => category.name)];

export function useProductsPage() {
  const [query, setQuery] = usePersistentState(QUERY_STORAGE_KEY, "");
  const [activeCategory, setActiveCategory] = usePersistentState(
    CATEGORY_STORAGE_KEY,
    "همه",
    (value) => VALID_CATEGORIES.includes(value),
  );
  const [view, setView] = usePersistentState(VIEW_STORAGE_KEY, "grid", (value) => value === "grid" || value === "table");
  const [currentPage, setCurrentPage] = useState(1);
  const actions = useProductPageActions();

  const productsQuery = useProducts({
    page: currentPage,
    limit: PAGE_SIZE,
    category: activeCategory === "همه" ? "all" : activeCategory,
    search: query,
  });

  const changeFilter = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  return {
    pageSize: PAGE_SIZE,
    query,
    setQuery: changeFilter(setQuery),
    activeCategory,
    setActiveCategory: changeFilter(setActiveCategory),
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
