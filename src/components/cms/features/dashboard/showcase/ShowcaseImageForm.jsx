import { PrimaryButton, Modal } from "../../../ui";
import ShowcaseImageFields from "./ShowcaseImageFields";

export default function ShowcaseImageForm({ open, onClose, editingImage, form, setForm, imageError, setImageError, fileInputRef, onPick, onSubmit, saving }) {
  const title = editingImage ? "ویرایش عکس ویترین" : "افزودن عکس ویترین";
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={(
        <>
          <button type="button" onClick={onClose} disabled={saving} className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50">انصراف</button>
          <PrimaryButton type="submit" form="showcase-image-form" loading={saving}>{saving ? "در حال ذخیره..." : editingImage ? "ذخیره تغییرات" : "ذخیره عکس"}</PrimaryButton>
        </>
      )}
    >
      <form id="showcase-image-form" onSubmit={onSubmit} className="space-y-4">
        <fieldset disabled={saving} className="space-y-4 disabled:opacity-60">
          <ShowcaseImageFields form={form} setForm={setForm} imageError={imageError} setImageError={setImageError} fileInputRef={fileInputRef} onPick={onPick} />
        </fieldset>
      </form>
    </Modal>
  );
}
