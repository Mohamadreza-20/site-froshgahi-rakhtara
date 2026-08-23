import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft, Shirt, Sparkles, ShoppingBag, Watch } from "lucide-react";
import { useCategories } from "../../lib/hooks/useCategories";
import { useProducts } from "../../lib/hooks/useProducts";

const CATEGORY_STYLE = {
	women: {
		icon: Sparkles,
		gradient: "from-rust to-rust-light",
	},
	men: {
		icon: Shirt,
		gradient: "from-forest to-forest-light",
	},
	shoes: {
		icon: ShoppingBag,
		gradient: "from-camel-dark to-camel",
	},
	accessory: {
		icon: Watch,
		gradient: "from-ink to-ink/70",
	},
};

export default function Categories() {
	const { products } = useProducts({ limit: 10000 });
	const { categories } = useCategories();

	const countsByCategory = useMemo(() => {
		const counts = new Map();
		for (const category of categories) counts.set(String(category.id), 0);
		for (const product of products) {
			const categoryId = product?.categoryId != null && product.categoryId !== ""
				? String(product.categoryId)
				: "";
			if (categoryId && counts.has(categoryId)) {
				counts.set(categoryId, counts.get(categoryId) + 1);
				continue;
			}
			const legacyName = String(product?.cat ?? "").trim();
			if (!legacyName) continue;
			const legacyCategory = categories.find((category) => String(category?.name ?? "").trim() === legacyName);
			if (legacyCategory) {
				const key = String(legacyCategory.id);
				counts.set(key, (counts.get(key) || 0) + 1);
			}
		}
		return counts;
	}, [categories, products]);

	return (
		<section id="categories" className="max-w-7xl mx-auto px-6 py-20">
			<div className="text-center mb-14">
				<span className="inline-block text-xs font-bold tracking-wide text-rust bg-rust/10 px-3 py-1 rounded-full mb-4">
					دسته‌بندی‌ها
				</span>
				<h2 className="text-3xl font-extrabold text-forest mb-3">
					دسته‌بندی‌ محصولات
				</h2>
				<p className="text-ink/60">هر استایل، تنوع خودش را دارد</p>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
				{categories.map((category) => {
					const style = CATEGORY_STYLE[category.id] || { icon: ShoppingBag, gradient: "from-forest to-forest-light" };
					const Icon = style.icon;
					const count = countsByCategory.get(String(category.id)) || 0;

					return (
						<Link
							key={category.id}
							to={`/category/${category.id}`}
							className="group relative overflow-hidden rounded-3xl aspect-[4/5] block shadow-lg shadow-ink/5 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
						>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${style.gradient} transition-transform duration-500 group-hover:scale-105`}
							/>

							<div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10" />
							<div className="absolute -bottom-14 -right-10 w-40 h-40 rounded-full bg-black/10" />

							<div className="relative h-full flex flex-col items-center justify-center text-center px-4">
								<span className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 text-cream transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
									<Icon size={28} strokeWidth={1.75} />
								</span>
								<p className="font-extrabold text-lg text-cream mb-1.5">
									{category.name}
								</p>
								{count > 0 && (
									<p className="text-xs text-cream/70">
										{count.toLocaleString("fa-IR")} محصول
									</p>
								)}

								<span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-cream/0 group-hover:text-cream transition-all duration-300 translate-y-2 group-hover:translate-y-0">
									مشاهده
									<ArrowLeft size={13} />
								</span>
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
