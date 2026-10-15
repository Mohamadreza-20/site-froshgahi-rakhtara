import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { ChevronLeft, SlidersHorizontal, PackageSearch } from "lucide-react";
import { CATEGORIES } from "../lib/data/products";
import { SORT_OPTIONS, sortProducts } from "../lib/productSort";
import { useProducts } from "../lib/hooks/useProducts";
import ProductCard from "../components/storefront/ProductCard";
import Pagination from "../components/storefront/Pagination";
import { ProductGridSkeleton } from "../components/storefront/ProductCardSkeleton";

const PAGE_SIZE = 15;

export default function AllProductsPage() {
	const { addToCart } = useOutletContext();
	const { products, loading } = useProducts();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [sort, setSort] = useState("default");

	const activeCategoryId = searchParams.get("category") || "all";
	const activeCategory = CATEGORIES.find((category) => category.id === activeCategoryId) || null;

	useEffect(() => {
		setCurrentPage(1);
		setSort("default");
	}, [activeCategoryId]);

	const filtered = useMemo(
		() =>
			activeCategory
				? products.filter((product) => product.cat === activeCategory.name)
				: products,
		[products, activeCategory],
	);

	const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

	const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

	const paginated = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return sorted.slice(start, start + PAGE_SIZE);
	}, [sorted, currentPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const selectCategory = (id) => {
		if (id === "all") {
			setSearchParams({});
		} else {
			setSearchParams({ category: id });
		}
	};

	return (
		<div>
			<section className="relative overflow-hidden bg-forest">
				<svg
					className="absolute inset-0 w-full h-full opacity-10"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<pattern
							id="weave-products"
							width="46"
							height="46"
							patternUnits="userSpaceOnUse"
							patternTransform="rotate(45)"
						>
							<line x1="0" y1="0" x2="0" y2="46" stroke="#D4A94E" strokeWidth="1" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#weave-products)" />
				</svg>

				<div className="relative max-w-7xl mx-auto px-6 py-14">
					<div className="flex items-center gap-2 text-sm mb-6 text-cream/70">
						<Link to="/" className="hover:underline hover:text-cream">
							خانه
						</Link>
						<ChevronLeft size={14} />
						<span className="text-cream">محصولات</span>
					</div>

					<div className="flex items-end justify-between flex-wrap gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-extrabold text-cream mb-3">
								{activeCategory ? activeCategory.name : "همه محصولات"}
							</h1>
							<p className="text-cream/70">
								{loading
									? "در حال بارگذاری..."
									: `${sorted.length.toLocaleString("fa-IR")} محصول`}
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								onClick={() => selectCategory("all")}
								className={`cursor-pointer text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
									activeCategoryId === "all"
										? "bg-cream text-forest border-cream"
										: "border-cream/30 text-cream hover:bg-cream/10"
								}`}
							>
								همه
							</button>
							{CATEGORIES.map((category) => (
								<button
									key={category.id}
									type="button"
									onClick={() => selectCategory(category.id)}
									className={`cursor-pointer text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
										category.id === activeCategoryId
											? "bg-cream text-forest border-cream"
											: "border-cream/30 text-cream hover:bg-cream/10"
									}`}
								>
									{category.emoji} {category.name}
								</button>
							))}
						</div>
					</div>
				</div>
				<div className="absolute inset-0 -z-10 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
			</section>

			<div className="max-w-7xl mx-auto px-6 py-10">
				{!loading && sorted.length > 0 && (
					<div className="flex items-center justify-between flex-wrap gap-4 mb-8">
						<p className="text-sm text-ink/50">
							نمایش {paginated.length.toLocaleString("fa-IR")} از{" "}
							{sorted.length.toLocaleString("fa-IR")} محصول
						</p>
						<label className="flex items-center gap-2 text-sm font-semibold text-ink/70 bg-white border border-ink/10 rounded-full px-4 py-2">
							<SlidersHorizontal size={16} className="text-forest" />
							مرتب‌سازی:
							<select
								value={sort}
								onChange={(event) => setSort(event.target.value)}
								className="cursor-pointer bg-transparent outline-none font-bold text-forest"
							>
								{SORT_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</label>
					</div>
				)}

				{loading ? (
					<ProductGridSkeleton count={PAGE_SIZE} />
				) : sorted.length === 0 ? (
					<div className="text-center py-20">
						<PackageSearch className="mx-auto mb-4 text-ink/20" size={48} />
						<p className="text-lg text-ink/60 mb-6">محصولی یافت نشد</p>
						<Link to="/" className="text-forest font-bold hover:underline">
							بازگشت به خانه
						</Link>
					</div>
				) : (
					<>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{paginated.map((product) => (
								<ProductCard key={product.id} product={product} onAdd={addToCart} />
							))}
						</div>

						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</>
				)}
			</div>
		</div>
	);
}
