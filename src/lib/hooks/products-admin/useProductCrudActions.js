import { useCallback } from "react";
import { toast } from "sonner";
import { useProductMutations } from "../useProducts";

export function useProductCrudActions({ editingProduct, deletingProduct, closeModal, setDeletingProduct, setNewProductId }) {
  const mutations = useProductMutations();

  const submitProduct = useCallback(async (form) => {
    if (editingProduct) {
      await mutations.update.mutateAsync({ id: editingProduct.id, data: form });
      toast.success("محصول بروزرسانی شد");
    } else {
      const created = await mutations.create.mutateAsync(form);
      setNewProductId(created.id);
      window.setTimeout(() => setNewProductId(null), 1500);
      toast.success("محصول جدید با موفقیت افزوده شد");
    }
    closeModal();
  }, [closeModal, editingProduct, mutations.create, mutations.update, setNewProductId]);

  const deleteProduct = useCallback(async () => {
    if (!deletingProduct) return;
    await mutations.remove.mutateAsync(deletingProduct.id);
    toast.success(`محصول «${deletingProduct.name}» حذف شد`);
    setDeletingProduct(null);
  }, [deletingProduct, mutations.remove, setDeletingProduct]);

  return {
    ...mutations,
    submitting: mutations.create.isPending || mutations.update.isPending,
    deleting: mutations.remove.isPending,
    submitProduct,
    deleteProduct,
  };
}
