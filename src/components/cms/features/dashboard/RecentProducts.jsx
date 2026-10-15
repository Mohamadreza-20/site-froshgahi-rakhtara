import { useEffect, useState } from "react";
import { ArrowLeft, ImageOff } from "lucide-react";
import { StockPill } from "../../ui";
import { toman } from "../../../../lib/data/products";
import { getProduct } from "../../../../services/products";
import { useNavigate } from "react-router-dom";

export default function RecentProducts() {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function getData() {
			const data = await getProduct();
			setProducts(data);
		}
		getData();
	}, []);

	const recentProducts = products.slice(0, 5);

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-5">
				<button
					onClick={() => navigate("/dashboard/products")}
					className="cursor-pointer flex items-center gap-1 text-xs font-medium text-[#6C63FF] hover:text-[#4F46E5] transition"
				>
					مشاهده همه <ArrowLeft size={13} />
				</button>
				<h3 className="font-bold text-[#111827]">۵ محصول آخر</h3>
			</div>
			<div className="flex flex-col divide-y divide-[#F5F6FA]">
				{recentProducts.map((product) => (
					<div
						key={product.sku || product.id}
						className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
					>
						<div className="text-left">
							<div className="text-sm font-semibold text-[#111827] tabular-nums">
								{toman(product.price)}
							</div>
							<StockPill stock={product.stock} />
						</div>
						<div className="flex items-center gap-3">
							<div className="text-right">
								<div className="text-sm font-medium text-[#111827]">
									{product.name}
								</div>
								<div className="text-xs text-[#9CA3AF] mt-0.5">{product.cat}</div>
							</div>
							<div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5F6FA] flex items-center justify-center shrink-0">
								{product.image ? (
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover"
									/>
								) : (
									<ImageOff size={16} className="text-[#9CA3AF]" />
								)}
							</div>
						</div>
					</div>
				))}
				{recentProducts.length === 0 && (
					<div className="text-center py-6 text-sm text-[#9CA3AF]">
						محصولی یافت نشد
					</div>
				)}
			</div>
		</div>
	);
}
