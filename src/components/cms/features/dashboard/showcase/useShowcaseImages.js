import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useShowcaseOrderMutation, useShowcaseQuery, useShowcaseCreateUpdateMutations, useShowcaseRemoveMutation } from "../../../../../lib/hooks/cms/useShowcaseQueries";
import { compressImageToDataUrl } from "../../../../../utils/image";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const emptyForm = { src: "", alt: "" };

export function useShowcaseImages() {
  const { data: images = [], isLoading: loading, isError, refetch } = useShowcaseQuery();
  const { create, update } = useShowcaseCreateUpdateMutations();
  const remove = useShowcaseRemoveMutation();
  const orderMutation = useShowcaseOrderMutation();
  const [modal, setModal] = useState({ open: false, editing: null });
  const [form, setForm] = useState(emptyForm);
  const [imageError, setImageError] = useState("");
  const [deletingImage, setDeletingImage] = useState(null);
  const fileInputRef = useRef(null);

  const openCreateModal = useCallback(() => { setModal({ open: true, editing: null }); setForm(emptyForm); setImageError(""); }, []);
  const openEditModal = useCallback((image) => { setModal({ open: true, editing: image }); setForm({ src: image.src, alt: image.alt ?? "" }); setImageError(""); }, []);
  const closeModal = useCallback(() => { if (create.isPending || update.isPending) return; setModal({ open: false, editing: null }); }, [create.isPending, update.isPending]);
  const handleImagePick = useCallback((event) => { const file = event.target.files?.[0]; event.target.value = ""; if (!file) return; if (!file.type.startsWith("image/")) return setImageError("لطفاً یک فایل تصویری انتخاب کنید"); if (file.size > MAX_IMAGE_SIZE) return setImageError("حجم تصویر باید کمتر از ۳ مگابایت باشد"); setImageError(""); compressImageToDataUrl(file).then((src) => setForm((previous) => ({ ...previous, src }))).catch(() => setImageError("خطا در پردازش تصویر")); }, []);
  const handleSubmit = useCallback(async (event) => { event.preventDefault(); if (!form.src) return setImageError("لطفاً یک تصویر انتخاب کنید"); try { if (modal.editing) { await update.mutateAsync({ id: modal.editing.id, data: { ...modal.editing, src: form.src, alt: form.alt } }); toast.success("عکس ویترین بروزرسانی شد"); } else { const nextOrder = images.reduce((max, image) => Math.max(max, image.order ?? 0), 0) + 1; await create.mutateAsync({ src: form.src, alt: form.alt, order: nextOrder }); toast.success("عکس ویترین اضافه شد"); } closeModal(); } catch (error) { toast.error(error?.userMessage || "ذخیره عکس ویترین با خطا مواجه شد"); } }, [closeModal, create, form, images, modal.editing, update]);
  const handleDelete = useCallback(async () => { if (!deletingImage) return; try { await remove.mutateAsync(deletingImage.id); toast.success("عکس ویترین حذف شد"); setDeletingImage(null); } catch (error) { toast.error(error?.userMessage || "حذف عکس ویترین با خطا مواجه شد"); } }, [deletingImage, remove]);
  const moveImage = useCallback(async (index, direction) => { const target = index + direction; if (target < 0 || target >= images.length || orderMutation.isPending) return; const first = images[index]; const second = images[target]; try { await orderMutation.mutateAsync({
        first: { id: first.id, data: { ...first, order: target + 1 }, originalData: { ...first } },
        second: { id: second.id, data: { ...second, order: index + 1 }, originalData: { ...second } },
      }); } catch (error) { toast.error(error?.userMessage || "تغییر ترتیب عکس‌ها با خطا مواجه شد"); } }, [images, orderMutation]);

  return { images, loading, error: isError, refetch, isModalOpen: modal.open, editingImage: modal.editing, form, setForm, imageError, setImageError, deletingImage, setDeletingImage, savingOrder: orderMutation.isPending, saving: create.isPending || update.isPending, deleting: remove.isPending, fileInputRef, openCreateModal, openEditModal, closeModal, handleImagePick, handleSubmit, handleDelete, moveImage };
}
