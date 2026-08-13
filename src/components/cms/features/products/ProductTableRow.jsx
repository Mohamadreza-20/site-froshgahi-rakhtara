import { memo } from "react";
import { Pencil, Trash2, ImageOff } from "lucide-react";
import { CategoryBadge, StockPill } from "../../ui";
import { toman } from "../../../../lib/data/products";
import ActionsMenu from "./ActionsMenu";

function ProductTableRow({ product, onEdit, onDelete, isNew }) {
	return (
		<tr
			className={`border-b border-[#F5F6FA] last:border-0 hover:bg-[#FAFAFC] transition ${
				isNew ? "product-row-enter" : ""
			}`}
		>
			<td className="px-5 py-3.5">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-lg overflow-hidden bg-[#F5F6FA] flex items-center justify-center shrink-0">
						{product.image ? (
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-full object-cover"
							/>
						) : (
							<ImageOff size={14} className="text-[#C6CAD3]" />
						)}
					</div>
					<span className="font-medium text-[#111827]">{product.name}</span>
				</div>
			</td>
			<td className="px-5 py-3.5">
				<CategoryBadge category={product.cat} />
			</td>
			<td
				className="px-5 py-3.5 text-[#6B7280] tabular-nums"
				dir="ltr"
				style={{ textAlign: "right" }}
			>
				{product.sku}
			</td>
			<td className="px-5 py-3.5 text-[#111827] font-medium tabular-nums">
				{toman(product.price)}
			</td>
			<td className="px-5 py-3.5">
				<StockPill stock={product.stock} />
			</td>
			<td className="px-5 py-3.5 text-left">
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
			</td>
		</tr>
	);
}

export default memo(ProductTableRow);
