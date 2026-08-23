import { Link, useLocation, useOutletContext, useParams } from "react-router-dom";
import { useCategories } from "../lib/hooks/useCategories";
import ProductDetailSkeleton from "../components/storefront/ProductDetailSkeleton";
import ProductBreadcrumbs from "../components/storefront/product-detail/ProductBreadcrumbs";
import ProductDetailContent from "../components/storefront/product-detail/ProductDetailContent";
import useProductDetailPage from "../lib/hooks/useProductDetailPage";
import { buildProductJsonLd, usePageMeta } from "../lib/hooks/usePageMeta";
import { getSiteUrl } from "../lib/seo";

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart, cart } = useOutletContext();
  const state = useProductDetailPage({ id, addToCart, cart });
  const { categories } = useCategories();

  usePageMeta(state.product ? {
    title: `${state.product.name} | Rakhtara`,
    description: state.product.description || state.product.longDesc || state.product.desc || `خرید ${state.product.name} از فروشگاه Rakhtara.`,
    path: state.productUrl,
    image: state.product.image,
    type: "product",
    jsonLd: buildProductJsonLd(state.product, `${getSiteUrl()}${state.productUrl}`, state.rating),
  } : {
    title: "محصول | Rakhtara",
    description: "محصول مورد نظر در فروشگاه Rakhtara پیدا نشد.",
    path: location.pathname,
    robots: "noindex, nofollow",
  });

  if (state.loading) return <ProductDetailSkeleton />;
  if (state.productError || !state.product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-lg text-ink/60 mb-6">محصول مورد نظر یافت نشد</p>
        <Link to="/" className="text-forest font-bold hover:underline">بازگشت به خانه</Link>
      </div>
    );
  }

  const categoryId = state.product.categoryId != null && state.product.categoryId !== ""
    ? categories.find((category) => String(category.id) === String(state.product.categoryId))?.id
    : categories.find((category) => category.name === state.product.cat)?.id;
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <ProductBreadcrumbs productName={state.product.name} categoryId={categoryId} />
      <ProductDetailContent state={state} categoryId={categoryId} onAdd={addToCart} />
    </div>
  );
}
