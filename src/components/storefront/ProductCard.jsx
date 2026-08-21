import OptimizedImage from "../shared/OptimizedImage";
import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ImageOff, Check, Star } from "lucide-react";
import { toman } from "../../lib/data/products";

function ProductCard({ product, onAdd, rating }) {
	const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
	const hasRating = typeof rating === "number" && rating > 0;

	const [isJustAdded, setIsJustAdded] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => () => clearTimeout(timeoutRef.current), []);

	const handleAdd = () => {
		onAdd(product);
		setIsJustAdded(true);
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setIsJustAdded(false), 1200);
	};

	return (
		<div
			className={`bg-white rounded-3xl overflow-hidden border border-ink/10 transition-all hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-1 ${
				isJustAdded ? "product-card-highlight" : ""
			}`}
		>
			<Link to={`/product/${product.id}`} className="block w-full text-right">
				<div className="relative aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-cream-dark to-camel-light/40">
					{product.image ? (
						<OptimizedImage
							src={product.image}
							alt={product.name}
							loading="lazy"
							className="w-full h-full object-cover"
						/>
					) : (
						<ImageOff className="text-cream/70" size={40} />
					)}
					{hasRating && (
						<span className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 text-[11px] font-bold text-forest px-2 py-1 rounded-full shadow-sm">
							<Star size={12} className="text-camel" fill="#D4A94E" />
							{rating.toLocaleString("fa-IR", { maximumFractionDigits: 1 })}
						</span>
					)}
				</div>
			</Link>
			<div className="p-6">
				<span className="inline-block text-[11px] font-bold text-forest bg-camel/20 px-2.5 py-1 rounded-full">
					{product.cat}
				</span>
				<Link to={`/product/${product.id}`} className="block text-right w-full">
					<h3 className="font-bold text-lg mt-1 mb-3 text-forest hover:underline">
						{product.name}
					</h3>
				</Link>
				<div className="flex items-center justify-between">
					<span className="font-extrabold text-forest">
						{toman(product.price)}
					</span>
					{hasSizes ? (
						<Link
							to={`/product/${product.id}`}
							className="text-sm font-semibold px-4 py-2 rounded-full transition-colors min-w-[84px] bg-forest hover:bg-forest-light text-cream text-center"
						>
							انتخاب سایز
						</Link>
					) : (
						<button
							onClick={handleAdd}
							className={`cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 min-w-[84px] active:scale-95 flex items-center justify-center gap-1 ${
								isJustAdded
									? "bg-camel text-forest"
									: "bg-forest hover:bg-forest-light text-cream"
							}`}
						>
							{isJustAdded ? (
								<>
									<Check size={14} className="shrink-0" />
									افزوده شد
								</>
							) : (
								"افزودن"
							)}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default memo(ProductCard);
