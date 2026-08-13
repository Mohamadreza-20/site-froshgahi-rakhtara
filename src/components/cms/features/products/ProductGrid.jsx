import ProductCard from "./ProductCard";

export default function ProductGrid({
	products,
	onEdit,
	onDelete,
	newProductId,
}) {
	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02]">
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
				{products.map((product) => (
					<ProductCard
						key={product.id ?? product.sku}
						product={product}
						onEdit={onEdit}
						onDelete={onDelete}
						isNew={newProductId != null && product.id === newProductId}
					/>
				))}
				{products.length === 0 && (
					<div className="col-span-full text-center py-10 text-[#6B7280] text-sm">
						محصولی با این مشخصات پیدا نشد
					</div>
				)}
			</div>
		</div>
	);
}
