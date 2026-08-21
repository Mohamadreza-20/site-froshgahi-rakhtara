import { Link } from "react-router-dom";
import ProductListingResults from "../components/storefront/ProductListingResults";
import CategoryHero from "../components/storefront/category/CategoryHero";
import { useCategoryPage } from "../lib/hooks/pages/useCategoryPage";

export default function CategoryPage() {
  const { id, category, addToCart, currentPage, sort, query, safePage, changeSort, changePage } = useCategoryPage();

  if (!query.loading && !category) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-lg text-ink/60 mb-6">دسته‌بندی مورد نظر یافت نشد</p>
        <Link to="/" className="text-forest font-bold hover:underline">بازگشت به خانه</Link>
      </div>
    );
  }

  return (
    <div>
      <CategoryHero category={category} id={id} total={query.total} loading={query.loading} />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <ProductListingResults
          products={query.products}
          loading={query.loading}
          error={query.error}
          refetch={query.refetch}
          total={query.total}
          fetching={query.fetching}
          sort={sort}
          onSortChange={changeSort}
          currentPage={safePage}
          totalPages={query.totalPages}
          onPageChange={changePage}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
}
