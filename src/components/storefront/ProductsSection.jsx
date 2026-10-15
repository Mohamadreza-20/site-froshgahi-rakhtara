import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../lib/hooks/useProducts";
import { getAllComments } from "../../services/comments";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";

const FEATURED_COUNT = 9;

export default function ProductsSection({ onAdd }) {
	const { products: PRODUCTS, loading: productsLoading } = useProducts();
	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(true);

	useEffect(() => {
		let ignore = false;
		getAllComments()
			.then((data) => {
				if (!ignore) setComments(data);
			})
			.catch(() => {
				if (!ignore) setComments([]);
			})
			.finally(() => {
				if (!ignore) setCommentsLoading(false);
			});
		return () => {
			ignore = true;
		};
	}, []);

	const loading = productsLoading || commentsLoading;

	const featuredProducts = useMemo(() => {
		if (!PRODUCTS.length) return [];

		const ratingByProduct = new Map();
		comments.forEach((comment) => {
			const productId = String(comment.productId);
			const entry = ratingByProduct.get(productId) || { sum: 0, count: 0 };
			entry.sum += Number(comment.rating || 0);
			entry.count += 1;
			ratingByProduct.set(productId, entry);
		});

		return PRODUCTS.map((product) => {
			const entry = ratingByProduct.get(String(product.id));
			const avgRating = entry ? entry.sum / entry.count : 0;
			const ratingCount = entry ? entry.count : 0;
			return { ...product, _avgRating: avgRating, _ratingCount: ratingCount };
		})
			.sort((firstProduct, secondProduct) => {
				if (secondProduct._avgRating !== firstProduct._avgRating) return secondProduct._avgRating - firstProduct._avgRating;
				return secondProduct._ratingCount - firstProduct._ratingCount;
			})
			.slice(0, FEATURED_COUNT);
	}, [PRODUCTS, comments]);

	return (
		<section id="products" className="max-w-7xl mx-auto px-6 py-20">
			<div className="flex items-end justify-between mb-14 flex-wrap gap-4">
				<div>
					<h2 className="text-3xl font-extrabold text-forest mb-3">
						محصولات ویژه
					</h2>
					<p className="text-ink/60">پرستاره‌ترین محصولات فروشگاه</p>
				</div>
				<Link to="/products" className="text-rust font-semibold hover:underline">
					مشاهده همه ←
				</Link>
			</div>
			{loading ? (
				<ProductGridSkeleton count={FEATURED_COUNT} />
			) : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{featuredProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onAdd={onAdd}
							rating={product._avgRating}
						/>
					))}
				</div>
			)}
		</section>
	);
}
