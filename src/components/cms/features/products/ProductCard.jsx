import OptimizedImage from "../../../shared/OptimizedImage";
import { memo } from "react";
import { Pencil, Trash2, ImageOff } from "lucide-react";
import { CategoryBadge, StockPill } from "../../ui";
import { toman } from "../../../../lib/data/products";
import ActionsMenu from "./ActionsMenu";

function ProductCard({ product, onEdit, onDelete, isNew }) {
	return (
		<div
			className={`rounded-2xl border border-[#EEF0F5] overflow-hidden hover:shadow-md hover:shadow-black/[0.04] hover:-translate-y-0.5 transition-all bg-[#FDFDFE] ${
				isNew ? "product-card-enter product-card-highlight" : ""
			}`}
		>
			<div className="relative aspect-[4/3] bg-[#F5F6FA]">
				{product.image ? (
					<OptimizedImage
						src={product.image}
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-[#C6CAD3]">
						<ImageOff size={28} />
					</div>
				)}
				<div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
					<ActionsMenu
						items={[
							{ label: "ویرایش", icon: Pencil, onClick: () => onEdit?.(product) },
							{
								label: "حذف",
								icon: Trash2,
								danger: true,
								onClick: () => onDelete?.(product),
							},
						]}
					/>
				</div>
			</div>
			<div className="text-right p-4">
				<div className="font-semibold text-[#111827] mb-1">{product.name}</div>
				<div
					className="text-xs text-[#9CA3AF] mb-3 tabular-nums"
					dir="ltr"
					style={{ textAlign: "right" }}
				>
					{product.sku}
				</div>
				<div className="flex items-center justify-between mb-3">
					<CategoryBadge category={product.cat} />
					<StockPill stock={product.stock} />
				</div>
				<div className="pt-3 border-t border-[#F1F2F6] flex items-center justify-between">
					<span className="text-xs text-[#9CA3AF]">قیمت</span>
					<span className="font-bold text-[#111827] tabular-nums">
						{toman(product.price)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default memo(ProductCard);
