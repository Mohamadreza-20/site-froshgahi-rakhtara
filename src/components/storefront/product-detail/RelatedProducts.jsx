import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { EmptyState, QueryLoadingState } from "../../shared/states/QueryStates";

export default function RelatedProducts({ products, fetching, categoryId, productId, onAdd }) {
  const related = products.filter((item) => String(item.id) !== String(productId)).slice(0, 3);

  return (
    <div>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <h2 className="text-2xl font-extrabold text-forest">محصولات مرتبط</h2>
        {categoryId && <Link to={`/category/${categoryId}`} className="text-rust font-semibold hover:underline text-sm">مشاهده همه ←</Link>}
      </div>
      {fetching && related.length === 0 ? (
        <QueryLoadingState message="در حال بارگذاری محصولات مرتبط..." />
      ) : related.length === 0 ? (
        <EmptyState title="محصول مرتبطی برای نمایش وجود ندارد" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map((item) => <ProductCard key={item.id} product={item} onAdd={onAdd} />)}
        </div>
      )}
    </div>
  );
}
