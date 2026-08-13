import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader, StatCard, ConfirmDialog, Pagination } from "../components/cms/ui";
import ProductsToolbar from "../components/cms/features/products/ProductsToolbar";
import ProductGrid from "../components/cms/features/products/ProductGrid";
import ProductsTable from "../components/cms/features/products/ProductsTable";
import ProductFormModal from "../components/cms/features/products/ProductFormModal";
import {
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../services/products";
import { CATEGORIES } from "../lib/data/products";
import { usePersistentState } from "../lib/hooks/usePersistentState";

const PAGE_SIZE = 6;
const VIEW_STORAGE_KEY = "nemonekar_products_view";
const CATEGORY_STORAGE_KEY = "nemonekar_products_category_filter";
const QUERY_STORAGE_KEY = "nemonekar_products_query";

const VALID_CATEGORIES = ["همه", ...CATEGORIES.map((category) => category.name)];

export default function Products() {
	const [productsData, setProductsData] = useState([]);
	const [query, setQuery] = usePersistentState(QUERY_STORAGE_KEY, "");
	const [activeCategory, setActiveCategory] = usePersistentState(
		CATEGORY_STORAGE_KEY,
		"همه",
		(value) => VALID_CATEGORIES.includes(value),
	);
	const [view, setView] = usePersistentState(
		VIEW_STORAGE_KEY,
		"grid",
		(value) => value === "grid" || value === "table",
	);
	const [currentPage, setCurrentPage] = useState(1);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [deletingProduct, setDeletingProduct] = useState(null);
	const [newProductId, setNewProductId] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		async function getData() {
			const product = await getProduct();
			setProductsData(product);
		}
		getData();
	}, []);

	const filtered = useMemo(
		() =>
			productsData.filter(
				(product) =>
					product.name.includes(query) &&
					(activeCategory === "همه" || product.cat === activeCategory),
			),
		[productsData, query, activeCategory],
	);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

	useEffect(() => {
		setCurrentPage(1);
	}, [query, activeCategory, view]);

	useEffect(() => {
		if (currentPage > totalPages) setCurrentPage(totalPages);
	}, [totalPages, currentPage]);

	const paginated = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return filtered.slice(start, start + PAGE_SIZE);
	}, [filtered, currentPage]);

	const { outOfStock, lowStock } = useMemo(() => {
		let outOfStock = 0;
		let lowStock = 0;
		for (const product of productsData) {
			if (product.stock === 0) outOfStock += 1;
			else if (product.stock <= 6) lowStock += 1;
		}
		return { outOfStock, lowStock };
	}, [productsData]);

	const openCreateModal = useCallback(() => {
		setEditingProduct(null);
		setIsModalOpen(true);
	}, []);

	const openEditModal = useCallback((product) => {
		setEditingProduct(product);
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		setEditingProduct(null);
	}, []);

	const handleSubmitProduct = async (form) => {
		const normalized = {
			...form,
			price: Number(form.price) || 0,
			stock: Number(form.stock) || 0,
		};

		setSubmitting(true);
		try {
			if (editingProduct) {
				const updated = await updateProduct(editingProduct.id, normalized);
				setProductsData((prev) =>
					prev.map((product) => (product.id === editingProduct.id ? updated : product)),
				);
				toast.success("محصول بروزرسانی شد");
			} else {
				const created = await createProduct(normalized);
				setProductsData((prev) => [...prev, created]);
				setNewProductId(created.id);
				window.setTimeout(() => setNewProductId(null), 1500);
				toast.success("محصول جدید با موفقیت افزوده شد");
			}
			closeModal();
		} catch (error) {
			console.error("ذخیره محصول با خطا مواجه شد:", error);
			toast.error("ذخیره محصول با خطا مواجه شد");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteProduct = async () => {
		if (!deletingProduct) return;
		setDeleting(true);
		try {
			await deleteProduct(deletingProduct.id);
			setProductsData((prev) =>
				prev.filter((product) => product.id !== deletingProduct.id),
			);
			toast.success(`محصول «${deletingProduct.name}» حذف شد`);
			setDeletingProduct(null);
		} catch (error) {
			console.error("حذف محصول با خطا مواجه شد:", error);
			toast.error("حذف محصول با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="space-y-6">
			<PageHeader
				title="محصولات"
				actionLabel="محصول جدید"
				onAction={openCreateModal}
			/>

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				<StatCard label="مجموع محصولات" value={productsData.length} />
				<StatCard
					label="موجود در انبار"
					value={productsData.length - outOfStock}
					valueClassName="text-[#16A34A]"
				/>
				<StatCard
					label="رو به اتمام"
					value={lowStock}
					valueClassName="text-[#B45309]"
				/>
				<StatCard
					label="ناموجود"
					value={outOfStock}
					valueClassName="text-[#DC2626]"
				/>
			</div>

			<div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02] space-y-5">
				<ProductsToolbar
					query={query}
					onQueryChange={setQuery}
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
					view={view}
					onViewChange={setView}
				/>

				{view === "grid" ? (
					<ProductGrid
						products={paginated}
						onEdit={openEditModal}
						onDelete={setDeletingProduct}
						newProductId={newProductId}
					/>
				) : (
					<ProductsTable
						products={paginated}
						onEdit={openEditModal}
						onDelete={setDeletingProduct}
						newProductId={newProductId}
					/>
				)}

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>

			<ProductFormModal
				open={isModalOpen}
				onClose={closeModal}
				onSubmit={handleSubmitProduct}
				product={editingProduct}
				submitting={submitting}
			/>

			<ConfirmDialog
				open={Boolean(deletingProduct)}
				onClose={() => setDeletingProduct(null)}
				onConfirm={handleDeleteProduct}
				loading={deleting}
				title="حذف محصول"
				description={
					deletingProduct
						? `آیا از حذف «${deletingProduct.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
						: ""
				}
			/>
		</div>
	);
}
