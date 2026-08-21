import { useProductForm } from "./form/useProductForm";
import ProductFormFields from "./form/ProductFormFields";
import { Modal, PrimaryButton } from "../../ui";

export default function ProductFormModal({ open, onClose, onSubmit, product, submitting = false }) {
  const isEditMode = Boolean(product);
  const formState = useProductForm(open, product);
  const handleClose = () => { if (!submitting) onClose?.(); };
  const handleSubmit = (event) => { event.preventDefault(); onSubmit?.(formState.buildPayload()); };

  return <Modal open={open} onClose={handleClose} title={isEditMode ? "ویرایش محصول" : "افزودن محصول جدید"} footer={<><button type="button" onClick={handleClose} disabled={submitting} className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50 disabled:cursor-not-allowed">انصراف</button><PrimaryButton type="submit" form="product-form" loading={submitting}>{submitting ? "در حال ذخیره..." : isEditMode ? "ذخیره تغییرات" : "ذخیره محصول"}</PrimaryButton></>}>
    <form id="product-form" onSubmit={handleSubmit}><fieldset disabled={submitting} className="space-y-4 disabled:opacity-60"><ProductFormFields form={formState.form} errors={formState.errors} imageError={formState.imageError} onChange={formState.onChange} onImageChange={(image) => formState.setForm((previous) => ({ ...previous, image }))} onImageError={formState.setImageError} /></fieldset></form>
  </Modal>;
}
