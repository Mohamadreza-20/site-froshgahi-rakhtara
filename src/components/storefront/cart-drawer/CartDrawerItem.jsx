import OptimizedImage from "../../shared/OptimizedImage";
import { ImageOff, Minus, Plus, Trash2 } from "lucide-react";
import { toman } from "../../../lib/data/products";

export default function CartDrawerItem({ item, onChangeQty, onRemove }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-ink/10">
      <div className={`w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-gradient-to-br ${item.gradient || "from-cream-dark to-camel-light/40"}`}>
        {item.image ? <OptimizedImage src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <ImageOff size={18} className="text-cream/70" aria-hidden="true" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate text-forest">{item.name}{item.size ? ` (سایز ${item.size})` : ""}</p>
        <p className="text-xs text-ink/50">{toman(item.price)}</p>
      </div>
      <div className="flex items-center gap-2" aria-label={`تعداد ${item.name}`}>
        <button type="button" onClick={() => onChangeQty(item.cartKey, -1)} aria-label={`کاهش تعداد ${item.name}`} className="cursor-pointer w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"><Minus size={12} aria-hidden="true" /></button>
        <span className="text-sm w-4 text-center" aria-live="polite">{item.qty}</span>
        <button type="button" onClick={() => onChangeQty(item.cartKey, 1)} disabled={Number.isFinite(Number(item.availableQty)) && item.qty >= Number(item.availableQty)} aria-label={`افزایش تعداد ${item.name}`} className="cursor-pointer w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 disabled:opacity-30 disabled:cursor-not-allowed"><Plus size={12} aria-hidden="true" /></button>
      </div>
      <button type="button" onClick={() => onRemove(item.cartKey)} aria-label={`حذف ${item.name} از سبد خرید`} className="cursor-pointer p-1 text-rust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust/30 rounded"><Trash2 size={16} aria-hidden="true" /></button>
    </div>
  );
}
