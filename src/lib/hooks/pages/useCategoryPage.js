import { useCallback, useMemo, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { CATEGORIES } from "../../data/products";
import { useProducts } from "../useProducts";
import { usePageMeta } from "../usePageMeta";

const PAGE_SIZE = 15;
const sortMap = {
  "price-asc": { sortField: "price", sortOrder: "asc" },
  "price-desc": { sortField: "price", sortOrder: "desc" },
  "name-asc": { sortField: "name", sortOrder: "asc" },
};

export function useCategoryPage() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("default");
  const category = useMemo(() => CATEGORIES.find((item) => item.id === id) || null, [id]);

  usePageMeta({
    title: category ? `${category.name} | Rakhtara` : "دسته‌بندی | Rakhtara",
    description: category ? `خرید ${category.name} از فروشگاه Rakhtara.` : "دسته‌بندی محصولات فروشگاه Rakhtara.",
    path: category ? `/category/${category.id}` : location.pathname,
    robots: category ? "index, follow" : "noindex, nofollow",
  });

  const query = useProducts({ page: currentPage, limit: PAGE_SIZE, category: category?.name || "all", ...(sortMap[sort] || {}), enabled: Boolean(category) });
  const safePage = Math.min(currentPage, query.totalPages);
  const changeSort = useCallback((value) => { setSort(value); setCurrentPage(1); }, []);
  const changePage = useCallback((page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return { id, category, addToCart, currentPage, sort, query, safePage, changeSort, changePage };
}
