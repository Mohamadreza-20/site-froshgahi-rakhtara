import { toast } from "sonner";
import { useProductDialogState } from "./products-admin/useProductDialogState";
import { useProductCrudActions } from "./products-admin/useProductCrudActions";


export function useProductPageActions() {
  const dialogs = useProductDialogState();
  const crud = useProductCrudActions(dialogs);

  const submitProduct = async (form) => {
    try {
      await crud.submitProduct(form);
    } catch (error) {
      toast.error(error?.userMessage || "ذخیره محصول با خطا مواجه شد");
    }
  };

  const deleteProduct = async () => {
    try {
      await crud.deleteProduct();
    } catch (error) {
      toast.error(error?.userMessage || "حذف محصول با خطا مواجه شد");
    }
  };

  return { ...dialogs, submitting: crud.submitting, deleting: crud.deleting, submitProduct, deleteProduct };
}
