import OptimizedImage from "../../shared/OptimizedImage";
import { ImageOff } from "lucide-react";
import StockPill from "../../cms/ui/StockPill";

export default function ProductDetailGallery({ product }) {
	return (
		<div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-cream-dark to-camel-light/40 flex items-center justify-center h-[380px] md:h-[460px]">
			{product.image ? (
				<OptimizedImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
			) : (
				<ImageOff className="text-cream/70" size={64} aria-hidden="true" />
			)}
			{typeof product.stock === "number" && (
				<span className="absolute top-4 right-4"><StockPill stock={product.stock} /></span>
			)}
		</div>
	);
}
