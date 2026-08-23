import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  useShowcaseOrderMutation,
  useShowcaseQuery,
  useShowcaseCreateUpdateMutations,
  useShowcaseRemoveMutation,
} from "../../../../../lib/hooks/cms/useShowcaseQueries";

const EMPTY_FORM = { src: "", alt: "", title: "" };

export function useShowcaseImages() {
  const { data: images = [], isLoading: loading, isError, refetch } = useShowcaseQuery();
  const { create, update } = useShowcaseCreateUpdateMutations();
  const remove = useShowcaseRemoveMutation();
  const orderMutation = useShowcaseOrderMutation();
  const [modal, setModal] = useState({ open: false, editing: null });
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageError, setImageError] = useState("");
  const [deletingImage, setDeletingImage] = useState(null);

  const openCreateModal = useCallback(() => {
    setModal({ open: true, editing: null });
    setForm(EMPTY_FORM);
    setImageError("");
  }, []);

  const openEditModal = useCallback((image) => {
    setModal({ open: true, editing: image });
    setForm({
      src: image.src ?? "",
      alt: image.alt ?? "",
      title: image.title ?? "",
    });
    setImageError("");
  }, []);

  const closeModal = useCallback(() => {
    if (create.isPending || update.isPending) return;
    setModal({ open: false, editing: null });
    setForm(EMPTY_FORM);
    setImageError("");
  }, [create.isPending, update.isPending]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const src = form.src.trim();
      const alt = form.alt.trim();
      const title = form.title.trim();

      if (!src) {
        setImageError("آدرس تصویر را وارد کنید");
        return;
      }

      const isValidSource = src.startsWith("/") || /^https?:\/\//i.test(src);
      if (!isValidSource) {
        setImageError("آدرس تصویر باید با / یا http:// یا https:// شروع شود");
        return;
      }

      try {
        if (modal.editing) {
          await update.mutateAsync({
            id: modal.editing.id,
            data: {
              ...modal.editing,
              src,
              alt,
              title,
            },
          });
          toast.success("اسلاید با موفقیت بروزرسانی شد");
        } else {
          const nextOrder =
            images.reduce((max, image) => Math.max(max, Number(image.order) || 0), 0) + 1;

          await create.mutateAsync({ src, alt, title, order: nextOrder });
          toast.success("اسلاید با موفقیت اضافه شد");
        }

        closeModal();
      } catch (error) {
        toast.error(error?.userMessage || "ذخیره اسلاید با خطا مواجه شد");
      }
    },
    [closeModal, create, form, images, modal.editing, update],
  );

  const handleDelete = useCallback(async () => {
    if (!deletingImage) return;

    try {
      await remove.mutateAsync(deletingImage.id);
      toast.success("اسلاید با موفقیت حذف شد");
      setDeletingImage(null);
    } catch (error) {
      toast.error(error?.userMessage || "حذف اسلاید با خطا مواجه شد");
    }
  }, [deletingImage, remove]);

  const moveImage = useCallback(
    async (index, direction) => {
      const target = index + direction;
      if (target < 0 || target >= images.length || orderMutation.isPending) return;

      const first = images[index];
      const second = images[target];
      const firstOrder = Number(first.order) || index + 1;
      const secondOrder = Number(second.order) || target + 1;

      try {
        await orderMutation.mutateAsync({
          first: {
            id: first.id,
            data: { ...first, order: secondOrder },
            originalData: { ...first, order: firstOrder },
          },
          second: {
            id: second.id,
            data: { ...second, order: firstOrder },
            originalData: { ...second, order: secondOrder },
          },
        });
        toast.success("ترتیب اسلایدها بروزرسانی شد");
      } catch (error) {
        toast.error(error?.userMessage || "تغییر ترتیب اسلایدها با خطا مواجه شد");
      }
    },
    [images, orderMutation],
  );

  return {
    images,
    loading,
    error: isError,
    refetch,
    isModalOpen: modal.open,
    editingImage: modal.editing,
    form,
    setForm,
    imageError,
    setImageError,
    deletingImage,
    setDeletingImage,
    savingOrder: orderMutation.isPending,
    saving: create.isPending || update.isPending,
    deleting: remove.isPending,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
    moveImage,
  };
}
