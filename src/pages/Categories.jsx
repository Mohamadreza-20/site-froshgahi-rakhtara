import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog, PageHeader, StatCard } from "../components/cms/ui";
import CategoryFormModal from "../components/cms/features/categories/CategoryFormModal";
import { useCategories, buildCategoryPayload, useCategoryMutations } from "../lib/hooks/useCategories";
import { useProducts } from "../lib/hooks/useProducts";
import { QueryErrorState, QueryLoadingState } from "../components/shared/states/QueryStates";

export default function Categories() {
  const { categories, isLoading, error, refetch } = useCategories();
  const productsQuery = useProducts({ limit: 10000 });
  const mutations = useCategoryMutations();
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const counts = useMemo(() => {
    const map = new Map(categories.map((category) => [String(category.id), 0]));
    (productsQuery.products || []).forEach((product) => {
      const categoryId = product.categoryId != null && product.categoryId !== "" ? String(product.categoryId) : "";
      if (categoryId && map.has(categoryId)) {
        map.set(categoryId, (map.get(categoryId) || 0) + 1);
        return;
      }
      const key = String(product.cat ?? "").trim();
      const legacyCategory = categories.find((category) => String(category.name).trim() === key);
      if (legacyCategory) map.set(String(legacyCategory.id), (map.get(String(legacyCategory.id)) || 0) + 1);
    });
    return map;
  }, [categories, productsQuery.products]);

  const openCreate = () => { setEditingCategory(null); setModalOpen(true); };
  const openEdit = (category) => { setEditingCategory(category); setModalOpen(true); };

  const submit = async (form) => {
    const duplicate = categories.some((item) => String(item.id) !== String(editingCategory?.id ?? "") && item.name.trim().toLocaleLowerCase("fa-IR") === form.name.trim().toLocaleLowerCase("fa-IR"));
    if (duplicate) {
      toast.error("این نام دسته‌بندی قبلاً ثبت شده است");
      return;
    }
    try {
      if (editingCategory) {
        await mutations.update.mutateAsync({ id: editingCategory.id, data: { ...editingCategory, ...form }, previousName: editingCategory.name });
        toast.success("دسته‌بندی با موفقیت ویرایش شد");
      } else {
        await mutations.create.mutateAsync(buildCategoryPayload(form, categories));
        toast.success("دسته‌بندی با موفقیت اضافه شد");
      }
      setModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      if (error?.message === "CATEGORY_NAME_REQUIRED") {
        toast.error("نام دسته‌بندی الزامی است");
      } else if (error?.message === "DUPLICATE_CATEGORY") {
        toast.error("این نام دسته‌بندی قبلاً ثبت شده است");
      } else {
        toast.error(error?.userMessage || error?.response?.data?.message || "ذخیره دسته‌بندی انجام نشد");
      }
    }
  };

  const remove = async () => {
    if (!deletingCategory) return;
    try {
      const result = await mutations.remove.mutateAsync(deletingCategory);
      const moved = result?.clearedProducts || 0;
      toast.success(
        moved > 0
          ? `دسته‌بندی حذف شد و ${moved.toLocaleString("fa-IR")} محصول به «بدون دسته‌بندی» منتقل شد`
          : "دسته‌بندی حذف شد",
      );
      setDeletingCategory(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "حذف دسته‌بندی انجام نشد");
    }
  };

  if (isLoading && !categories.length) return <QueryLoadingState message="در حال بارگذاری دسته‌بندی‌ها..." />;
  if (error && !categories.length) return <QueryErrorState message="خطا در دریافت دسته‌بندی‌ها" onRetry={refetch} />;

  const submitting = mutations.create.isPending || mutations.update.isPending;

  return (
    <div className="space-y-6">
      <PageHeader title="دسته‌بندی‌ها" actionLabel="دسته‌بندی جدید" onAction={openCreate} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard label="مجموع دسته‌بندی‌ها" value={categories.length} />
        <StatCard label="دسته‌های دارای محصول" value={categories.filter((category) => (counts.get(String(category.id)) || 0) > 0).length} />
        <StatCard label="کل محصولات" value={productsQuery.total || 0} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map((category) => {
          const count = counts.get(String(category.id)) || 0;
          return (
            <article key={category.id} className="bg-white border border-[#EEF0F5] rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className={`w-12 h-12 rounded-2xl ${category.bg || "bg-forest-light"} flex items-center justify-center text-2xl`}>{category.emoji || "🛍️"}</div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => openEdit(category)} className="cursor-pointer p-2 rounded-lg text-[#6B7280] hover:bg-[#F5F6FA]" aria-label={`ویرایش ${category.name}`}><Pencil size={16} /></button>
                  <button type="button" onClick={() => setDeletingCategory(category)} className="cursor-pointer p-2 rounded-lg text-[#DC2626] hover:bg-[#FEF2F2]" aria-label={`حذف ${category.name}`}><Trash2 size={16} /></button>
                </div>
              </div>
              <h2 className="font-bold text-lg text-[#111827] mt-4">{category.name}</h2>
              <p className="text-sm text-[#9CA3AF] mt-1">{count.toLocaleString("fa-IR")} محصول</p>
              <div className="mt-4 h-2 rounded-full bg-[#F5F6FA] overflow-hidden"><div className="h-full bg-[#16A34A] rounded-full" style={{ width: `${Math.min(100, count ? 100 : 0)}%` }} /></div>
            </article>
          );
        })}
      </div>

      {!categories.length && <div className="bg-white border border-dashed border-[#D1D5DB] rounded-2xl p-10 text-center text-sm text-[#6B7280]">هنوز دسته‌بندی‌ای ساخته نشده است.</div>}

      <CategoryFormModal open={modalOpen} onClose={() => { if (!submitting) { setModalOpen(false); setEditingCategory(null); } }} onSubmit={submit} category={editingCategory} submitting={submitting} />
      <ConfirmDialog open={Boolean(deletingCategory)} onClose={() => setDeletingCategory(null)} onConfirm={remove} loading={mutations.remove.isPending} title="حذف دسته‌بندی" description={deletingCategory ? `آیا از حذف «${deletingCategory.name}» مطمئن هستید؟ محصولات این دسته در صورت وجود به «بدون دسته‌بندی» منتقل می‌شوند.` : ""} />
    </div>
  );
}
