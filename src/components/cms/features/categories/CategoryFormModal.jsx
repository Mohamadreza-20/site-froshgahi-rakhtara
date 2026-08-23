import { useEffect, useState } from "react";
import { Modal, PrimaryButton } from "../../ui";

const PRESETS = [
  { label: "قرمز", value: "bg-rust" },
  { label: "سبز", value: "bg-forest-light" },
  { label: "طلایی", value: "bg-camel-dark" },
  { label: "تیره", value: "bg-ink" },
];

export default function CategoryFormModal({ open, onClose, onSubmit, category, submitting = false }) {
  const [form, setForm] = useState({ name: "", emoji: "🛍️", bg: "bg-forest-light" });

  useEffect(() => {
    if (!open) return;
    setForm({
      name: category?.name ?? "",
      emoji: category?.emoji ?? "🛍️",
      bg: category?.bg ?? "bg-forest-light",
    });
  }, [category, open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    onSubmit({ ...form, name });
  };

  const editMode = Boolean(category);

  return (
    <Modal
      open={open}
      onClose={() => !submitting && onClose?.()}
      title={editMode ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
      footer={<>
        <button type="button" onClick={onClose} disabled={submitting} className="cursor-pointer px-5 py-2.5 rounded-xl text-sm text-[#6B7280] hover:bg-[#F5F6FA] disabled:opacity-50">انصراف</button>
        <PrimaryButton type="submit" form="category-form" loading={submitting}>{editMode ? "ذخیره تغییرات" : "افزودن دسته‌بندی"}</PrimaryButton>
      </>}
    >
      <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-[#6B7280] space-y-1.5">
          <span>نام دسته‌بندی</span>
          <input autoFocus value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="مثلاً لباس ورزشی" className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF]" />
        </label>
        <label className="block text-sm text-[#6B7280] space-y-1.5">
          <span>آیکن</span>
          <input value={form.emoji} onChange={(e) => setForm((f) => ({ ...f, emoji: e.target.value }))} maxLength={4} className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF]" />
        </label>
        <label className="block text-sm text-[#6B7280] space-y-1.5">
          <span>رنگ نمایش</span>
          <select value={form.bg} onChange={(e) => setForm((f) => ({ ...f, bg: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] bg-white">
            {PRESETS.map((preset) => <option key={preset.value} value={preset.value}>{preset.label}</option>)}
          </select>
        </label>
      </form>
    </Modal>
  );
}
