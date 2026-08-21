import { Check, Hash, Minus, Plus, Scissors, ShieldCheck, Truck } from "lucide-react";
import { toman } from "../../../lib/data/products";

export default function ProductPurchasePanel({ product, qty, size, justAdded, outOfStock, hasSizes, onQtyChange, onSizeChange, onAddToCart }) {
	return (
		<div>
			<div className="flex items-center gap-2 mb-3">
				<span className="inline-block text-[11px] font-bold text-forest bg-camel/20 px-2.5 py-1 rounded-full">{product.cat}</span>
				{product.sku && <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink/40"><Hash size={12} aria-hidden="true" />{product.sku}</span>}
			</div>
			<h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-forest">{product.name}</h1>
			<p className="text-lg leading-8 mb-2 text-ink/80">{product.desc}</p>
			<p className="leading-8 mb-8 text-ink/60">{product.longDesc}</p>
			<div className="flex items-center gap-6 mb-8"><span className="text-3xl font-extrabold text-forest">{toman(product.price)}</span></div>

			<div className="bg-cream-dark/60 rounded-3xl p-6 mb-8">
				{hasSizes && <div className="mb-6">
					<p className="text-sm font-bold mb-3 text-ink/70">انتخاب سایز</p>
					<div className="flex flex-wrap gap-2">
						{product.sizes.map((sizeOption) => (
							<button key={sizeOption} type="button" onClick={() => onSizeChange(sizeOption)} aria-pressed={size === sizeOption} className={`cursor-pointer w-11 h-11 rounded-full border flex items-center justify-center text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 ${size === sizeOption ? "bg-forest text-cream border-forest" : "bg-white border-ink/20 text-ink/70 hover:border-forest/40"}`}>{sizeOption}</button>
						))}
					</div>
				</div>}

				<div className="flex items-center gap-4">
					<div className="flex items-center gap-3 bg-white border border-ink/15 rounded-full px-4 py-2">
						<button type="button" onClick={() => onQtyChange(Math.max(1, qty - 1))} aria-label="کاهش تعداد" className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 rounded-full"><Minus size={16} aria-hidden="true" /></button>
						<span className="w-6 text-center font-bold" aria-live="polite">{qty.toLocaleString("fa-IR")}</span>
						<button type="button" onClick={() => onQtyChange(qty + 1)} aria-label="افزایش تعداد" className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 rounded-full"><Plus size={16} aria-hidden="true" /></button>
					</div>
					<button type="button" onClick={onAddToCart} disabled={outOfStock} aria-disabled={outOfStock} className={`cursor-pointer flex-1 font-bold py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 ${justAdded ? "bg-camel text-forest" : "bg-forest text-cream"}`}>
						{outOfStock ? "ناموجود" : justAdded ? <><Check size={18} aria-hidden="true" />به سبد اضافه شد</> : "افزودن به سبد خرید"}
					</button>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 pt-6 border-t border-ink/10">
				{[[Truck,"ارسال سریع"],[ShieldCheck,"ضمانت اصالت"],[Scissors,"دوخت دست‌ساز"]].map(([Icon, label]) => <div key={label} className="text-center"><Icon size={20} className="mx-auto mb-1 text-forest" aria-hidden="true" /><p className="text-xs text-ink/50">{label}</p></div>)}
			</div>
		</div>
	);
}
