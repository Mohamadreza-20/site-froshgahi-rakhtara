import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import {
	ChevronLeft,
	Minus,
	Plus,
	Truck,
	ShieldCheck,
	Scissors,
	ImageOff,
	Check,
	Hash,
} from "lucide-react";
import { CATEGORIES, toman } from "../lib/data/products";
import { useProducts } from "../lib/hooks/useProducts";
import ProductCard from "../components/storefront/ProductCard";
import ProductComments from "../components/storefront/ProductComments";
import StockPill from "../components/cms/ui/StockPill";
import ProductDetailSkeleton from "../components/storefront/ProductDetailSkeleton";

export default function ProductDetailPage() {
	const { id } = useParams();
	const { addToCart } = useOutletContext();

	const { products, loading } = useProducts();

	const product = products.find((currentProduct) => String(currentProduct.id) === String(id)) || null;
	const hasSizes = Array.isArray(product?.sizes) && product.sizes.length > 0;
	const hasStock = typeof product?.stock === "number";

	const [qty, setQty] = useState(1);
	const [size, setSize] = useState(null);
	const [justAdded, setJustAdded] = useState(false);
	const justAddedTimeout = useRef(null);

	useEffect(() => {
		setQty(1);
		setSize(hasSizes ? product.sizes[0] : null);
	}, [product?.id]);

	useEffect(() => () => clearTimeout(justAddedTimeout.current), []);

	const outOfStock = hasStock && product.stock === 0;

	const handleAddToCart = () => {
		if (outOfStock) return;
		addToCart(product, qty, size);
		setJustAdded(true);
		clearTimeout(justAddedTimeout.current);
		justAddedTimeout.current = setTimeout(() => setJustAdded(false), 1200);
	};

	if (loading) {
		return <ProductDetailSkeleton />;
	}

	if (!product) {
		return (
			<div className="max-w-7xl mx-auto px-6 py-20 text-center">
				<p className="text-lg text-ink/60 mb-6">محصول مورد نظر یافت نشد</p>
				<Link to="/" className="text-forest font-bold hover:underline">
					بازگشت به خانه
				</Link>
			</div>
		);
	}

	const related = products.filter(
		(currentProduct) => currentProduct.cat === product.cat && currentProduct.id !== product.id,
	).slice(0, 3);
	const relatedFallback = related.length
		? related
		: products.filter((currentProduct) => currentProduct.id !== product.id).slice(0, 3);
	const categoryId = CATEGORIES.find((category) => category.name === product.cat)?.id;

	return (
		<div className="max-w-7xl mx-auto px-6 py-10">
			<div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
				<Link to="/" className="hover:underline text-forest">
					خانه
				</Link>
				<ChevronLeft size={14} />
				<Link
					to={categoryId ? `/products?category=${categoryId}` : "/products"}
					className="hover:underline text-forest"
				>
					محصولات
				</Link>
				<ChevronLeft size={14} />
				<span>{product.name}</span>
			</div>

			<div className="grid md:grid-cols-2 gap-12 mb-16">
				<div>
					<div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-cream-dark to-camel-light/40 flex items-center justify-center h-[380px] md:h-[460px]">
						{product.image ? (
							<img
								src={product.image}
								loading="lazy"
								alt={product.name}
								className="w-full h-full object-cover"
							/>
						) : (
							<ImageOff className="text-cream/70" size={64} />
						)}
						{hasStock && (
							<span className="absolute top-4 right-4">
								<StockPill stock={product.stock} />
							</span>
						)}
					</div>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-3">
						<span className="inline-block text-[11px] font-bold text-forest bg-camel/20 px-2.5 py-1 rounded-full">
							{product.cat}
						</span>
						{product.sku && (
							<span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink/40">
								<Hash size={12} />
								{product.sku}
							</span>
						)}
					</div>
					<h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-forest">
						{product.name}
					</h1>
					<p className="text-lg leading-8 mb-2 text-ink/80">{product.desc}</p>
					<p className="leading-8 mb-8 text-ink/60">{product.longDesc}</p>

					<div className="flex items-center gap-6 mb-8">
						<span className="text-3xl font-extrabold text-forest">
							{toman(product.price)}
						</span>
					</div>

					<div className="bg-cream-dark/60 rounded-3xl p-6 mb-8">
						{hasSizes && (
							<div className="mb-6">
								<p className="text-sm font-bold mb-3 text-ink/70">
									انتخاب سایز
								</p>
								<div className="flex flex-wrap gap-2">
									{product.sizes.map((sizeOption) => (
										<button
											key={sizeOption}
											onClick={() => setSize(sizeOption)}
											className={`cursor-pointer w-11 h-11 rounded-full border flex items-center justify-center text-sm font-bold transition-colors ${
												size === sizeOption
													? "bg-forest text-cream border-forest"
													: "bg-white border-ink/20 text-ink/70 hover:border-forest/40"
											}`}
										>
											{sizeOption}
										</button>
									))}
								</div>
							</div>
						)}

						<div className="flex items-center gap-4">
							<div className="flex items-center gap-3 bg-white border border-ink/15 rounded-full px-4 py-2">
								<button
									onClick={() => setQty((prevQty) => Math.max(1, prevQty - 1))}
									aria-label="کاهش تعداد"
									className="cursor-pointer"
								>
									<Minus size={16} />
								</button>
								<span className="w-6 text-center font-bold">
									{qty.toLocaleString("fa-IR")}
								</span>
								<button
									onClick={() => setQty((prevQty) => prevQty + 1)}
									aria-label="افزایش تعداد"
									className="cursor-pointer"
								>
									<Plus size={16} />
								</button>
							</div>
							<button
								onClick={handleAddToCart}
								disabled={outOfStock}
								className={`cursor-pointer flex-1 font-bold py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
									justAdded ? "bg-camel text-forest" : "bg-forest text-cream"
								}`}
							>
								{outOfStock ? (
									"ناموجود"
								) : justAdded ? (
									<>
										<Check size={18} />
										به سبد اضافه شد
									</>
								) : (
									"افزودن به سبد خرید"
								)}
							</button>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-4 pt-6 border-t border-ink/10">
						{[
							{ icon: Truck, label: "ارسال سریع" },
							{ icon: ShieldCheck, label: "ضمانت اصالت" },
							{ icon: Scissors, label: "دوخت دست‌ساز" },
						].map(({ icon: Icon, label }) => (
							<div key={label} className="text-center">
								<Icon size={20} className="mx-auto mb-1 text-forest" />
								<p className="text-xs text-ink/50">{label}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<ProductComments productId={product.id} />

			<div>
				<div className="flex items-end justify-between mb-8 flex-wrap gap-3">
					<h2 className="text-2xl font-extrabold text-forest">
						محصولات مرتبط
					</h2>
					{categoryId && (
						<Link
							to={`/category/${categoryId}`}
							className="text-rust font-semibold hover:underline text-sm"
						>
							مشاهده همه ←
						</Link>
					)}
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{relatedFallback.map((relatedProduct) => (
						<ProductCard key={relatedProduct.id} product={relatedProduct} onAdd={addToCart} />
					))}
				</div>
			</div>
		</div>
	);
}
