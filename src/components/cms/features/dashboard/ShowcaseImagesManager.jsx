import { PrimaryButton, ConfirmDialog } from "../../ui";
import { EmptyState, QueryErrorState, QueryLoadingState } from "../../../shared/states/QueryStates";
import ShowcaseImageForm from "./showcase/ShowcaseImageForm";
import ShowcaseImageGrid from "./showcase/ShowcaseImageGrid";
import { useShowcaseImages } from "./showcase/useShowcaseImages";

export default function ShowcaseImagesManager() {
  const {
    images,
    loading,
    error,
    refetch,
    isModalOpen,
    editingImage,
    form,
    setForm,
    imageError,
    setImageError,
    deletingImage,
    setDeletingImage,
    savingOrder,
    saving,
    deleting,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
    moveImage,
  } = useShowcaseImages();

  return (
    <section
      className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]"
      aria-labelledby="showcase-manager-title"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 id="showcase-manager-title" className="font-bold text-lg text-[#111827]">
            مدیریت اسلایدر صفحه اصلی
          </h3>
          <p className="text-sm text-[#6B7280] mt-1">
            تصاویر Swiper را اضافه، ویرایش، حذف و جابه‌جا کنید.
          </p>
        </div>
        <PrimaryButton type="button" onClick={openCreateModal}>افزودن تصویر</PrimaryButton>
      </div>

      {loading ? <QueryLoadingState message="در حال بارگذاری تصاویر اسلایدر..." skeleton /> : null}
      {error ? <QueryErrorState message="دریافت تصاویر اسلایدر ناموفق بود" onRetry={refetch} /> : null}
      {!loading && !error && images.length === 0 ? (
        <EmptyState
          title="هنوز تصویری برای اسلایدر ثبت نشده است"
          description="برای نمایش اسلاید جدید، اولین تصویر را اضافه کنید."
          action={
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex cursor-pointer items-center justify-center px-5 py-2.5 rounded-xl bg-[#16A34A] text-white text-sm font-medium hover:bg-[#128a3e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/30"
            >
              افزودن تصویر
            </button>
          }
        />
      ) : null}
      {!loading && !error && images.length > 0 ? (
        <ShowcaseImageGrid
          images={images}
          savingOrder={savingOrder}
          onEdit={openEditModal}
          onDelete={setDeletingImage}
          onMove={moveImage}
        />
      ) : null}

      <ShowcaseImageForm
        open={isModalOpen}
        onClose={closeModal}
        editingImage={editingImage}
        form={form}
        setForm={setForm}
        imageError={imageError}
        setImageError={setImageError}
        onSubmit={handleSubmit}
        saving={saving}
      />

      <ConfirmDialog
        open={Boolean(deletingImage)}
        onClose={() => !deleting && setDeletingImage(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="حذف تصویر اسلایدر"
        description={
          deletingImage
            ? `آیا از حذف تصویر «${deletingImage.alt || "بدون عنوان"}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
            : ""
        }
      />
    </section>
  );
}
