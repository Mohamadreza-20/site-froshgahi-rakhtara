import { Link } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { ProductGridSkeleton } from "./ProductCardSkeleton";
import { EmptyState, QueryErrorState } from "../shared/states/QueryStates";
import { SORT_OPTIONS } from "../../lib/productSort";

export default function ProductListingResults({ products, loading, error, refetch, total, fetching, sort, onSortChange, currentPage, totalPages, onPageChange, addToCart }) {
  if (loading) return <ProductGridSkeleton count={15}/>;
  if (error) return <QueryErrorState message="خطا در دریافت محصولات" onRetry={refetch}/>;
  if (!products.length) return <EmptyState title="محصولی یافت نشد" action={<Link to="/" className="text-forest font-bold hover:underline">بازگشت به خانه</Link>}/>;
  return <>
    <div className="flex items-center justify-between flex-wrap gap-4 mb-8"><div><p className="text-sm text-ink/50">نمایش {products.length.toLocaleString("fa-IR")} از {total.toLocaleString("fa-IR")} محصول</p>{fetching&&<p className="text-xs text-ink/40 mt-1" aria-live="polite">در حال به‌روزرسانی…</p>}</div><label className="flex items-center gap-2 text-sm font-semibold text-ink/70 bg-white border border-ink/10 rounded-full px-4 py-2"><SlidersHorizontal size={16} className="text-forest"/>مرتب‌سازی:<select value={sort} onChange={(e)=>onSortChange(e.target.value)} className="cursor-pointer bg-transparent outline-none font-bold text-forest">{SORT_OPTIONS.map((option)=><option key={option.value} value={option.value}>{option.label}</option>)}</select></label></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{products.map((product)=><ProductCard key={product.id} product={product} onAdd={addToCart}/>)}</div>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
  </>;
}
