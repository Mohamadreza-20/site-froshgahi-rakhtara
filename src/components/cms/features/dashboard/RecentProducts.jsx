import OptimizedImage from "../../../shared/OptimizedImage";
import { ArrowLeft, ImageOff } from "lucide-react";
import { QueryErrorState, QueryLoadingState, EmptyState } from "../../../shared/states/QueryStates";
import { useNavigate } from "react-router-dom";
import { StockPill } from "../../ui";
import { toman } from "../../../../lib/data/products";
import { useProducts } from "../../../../lib/hooks/useProducts";

export default function RecentProducts() {
  const navigate = useNavigate();
  const { products, loading, error, refetch } = useProducts({ limit: 5 });
  return <div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
    <div className="flex items-center justify-between mb-5"><button type="button" onClick={() => navigate("/dashboard/products")} className="cursor-pointer flex items-center gap-1 text-xs font-medium text-[#6C63FF] hover:text-[#4F46E5] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/30 rounded">مشاهده همه <ArrowLeft size={13} aria-hidden="true" /></button><h3 className="font-bold text-[#111827]">۵ محصول آخر</h3></div>
    {loading ? <QueryLoadingState message="در حال بارگذاری محصولات..." skeleton /> : error ? <QueryErrorState message="دریافت محصولات ناموفق بود" onRetry={refetch} /> : !products.length ? <EmptyState title="محصولی یافت نشد" /> : <div className="flex flex-col divide-y divide-[#F5F6FA]">
      {products.slice(0, 5).map((product) => <div key={product.sku || product.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0"><div className="text-left"><div className="text-sm font-semibold text-[#111827] tabular-nums">{toman(product.price)}</div><StockPill stock={product.stock} /></div><div className="flex items-center gap-3"><div className="text-right"><div className="text-sm font-medium text-[#111827]">{product.name}</div><div className="text-xs text-[#9CA3AF] mt-0.5">{product.cat}</div></div><div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5F6FA] flex items-center justify-center shrink-0">{product.image ? <OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" /> : <ImageOff size={16} className="text-[#9CA3AF]" aria-hidden="true" />}</div></div></div>)}
    </div>}
  </div>;
}
