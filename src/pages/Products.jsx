import { PageHeader, StatCard, ConfirmDialog, Pagination } from "../components/cms/ui";
import ProductsToolbar from "../components/cms/features/products/ProductsToolbar";
import ProductGrid from "../components/cms/features/products/ProductGrid";
import ProductsTable from "../components/cms/features/products/ProductsTable";
import ProductFormModal from "../components/cms/features/products/ProductFormModal";
import { QueryErrorState, QueryLoadingState } from "../components/shared/states/QueryStates";
import { useProductsPage } from "../lib/hooks/useProductsPage";

export default function Products() {
  const state = useProductsPage();
  return <div className="space-y-6">
    <PageHeader title="محصولات" actionLabel="محصول جدید" onAction={state.openCreateModal} />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"><StatCard label="تعداد این صفحه" value={state.products.length} /><StatCard label="مجموع فیلترشده" value={state.total} /><StatCard label="رو به اتمام" value={state.lowStock} valueClassName="text-[#B45309]" /><StatCard label="ناموجود" value={state.outOfStock} valueClassName="text-[#DC2626]" /></div>
    <div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02] space-y-5">
      {state.error ? <QueryErrorState message="خطا در دریافت محصولات" onRetry={state.refetch} /> : state.loading ? <QueryLoadingState message="در حال بارگذاری محصولات..." /> : <>
        <ProductsToolbar
          query={state.query}
          onQueryChange={state.setQuery}
          activeCategory={state.activeCategory}
          onCategoryChange={state.setActiveCategory}
          manualFilters={state.manualFilters}
          onManualFilterChange={state.updateManualFilter}
          onResetManualFilters={state.resetManualFilters}
          hasManualFilters={state.hasManualFilters}
          view={state.view}
          onViewChange={state.setView}
        />
        {state.fetching && !state.loading && (
          <p className="text-xs text-ink/40" aria-live="polite">در حال به‌روزرسانی نتایج…</p>
        )}
        {state.loading ? (
          <QueryLoadingState message="در حال بارگذاری محصولات..." />
        ) : (
          <>
            {state.view === "grid" ? <ProductGrid products={state.products} onEdit={state.openEditModal} onDelete={state.setDeletingProduct} newProductId={state.newProductId} /> : <ProductsTable products={state.products} onEdit={state.openEditModal} onDelete={state.setDeletingProduct} newProductId={state.newProductId} />}
            <Pagination currentPage={Math.min(state.currentPage, state.totalPages)} totalPages={state.totalPages} onPageChange={state.setCurrentPage} />
          </>
        )}
      </>}
    </div>
    <ProductFormModal open={state.isModalOpen} onClose={state.closeModal} onSubmit={state.submitProduct} product={state.editingProduct} submitting={state.submitting} />
    <ConfirmDialog open={Boolean(state.deletingProduct)} onClose={() => !state.deleting && state.setDeletingProduct(null)} onConfirm={state.deleteProduct} loading={state.deleting} title="حذف محصول" description={state.deletingProduct ? `آیا از حذف «${state.deletingProduct.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.` : ""} />
  </div>;
}
