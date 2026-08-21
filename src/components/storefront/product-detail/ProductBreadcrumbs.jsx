import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductBreadcrumbs({ productName, categoryId }) {
  return (
    <div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
      <Link to="/" className="hover:underline text-forest">خانه</Link>
      <ChevronLeft size={14} aria-hidden="true" />
      <Link to={categoryId ? `/products?category=${categoryId}` : "/products"} className="hover:underline text-forest">محصولات</Link>
      <ChevronLeft size={14} aria-hidden="true" />
      <span>{productName}</span>
    </div>
  );
}
