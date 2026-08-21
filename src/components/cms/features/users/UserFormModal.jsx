import { useEffect, useState } from "react";
import { Modal, PrimaryButton } from "../../ui";
import { toJalaliToday } from "../../../../utils/date";
import UserFormFields from "./form/UserFormFields";

const ROLES = ["مشتری", "مدیر فروشگاه", "پشتیبانی"];
const STATUSES = ["فعال", "غیرفعال"];
const EMPTY_FORM = { name: "", email: "", phone: "", role: ROLES[0], status: STATUSES[0] };

function getFormFromUser(user) {
  return user
    ? {
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        role: user.role ?? ROLES[0],
        status: user.status ?? STATUSES[0],
      }
    : EMPTY_FORM;
}

export default function UserFormModal({ open, onClose, onSubmit, user, submitting = false }) {
  const isEditMode = Boolean(user);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (open) setForm(getFormFromUser(user));
  }, [open, user]);

  const handleChange = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));
  const handleClose = () => { if (!submitting) onClose?.(); };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = isEditMode
      ? { ...form }
      : { ...form, joined: toJalaliToday(), seed: `${form.name.trim() || "user"}-${Date.now()}` };
    onSubmit?.(payload);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید"}
      footer={(
        <>
          <button type="button" onClick={handleClose} disabled={submitting} className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50 disabled:cursor-not-allowed">
            انصراف
          </button>
          <PrimaryButton type="submit" form="user-form" loading={submitting}>
            {submitting ? "در حال ذخیره..." : isEditMode ? "ذخیره تغییرات" : "ذخیره کاربر"}
          </PrimaryButton>
        </>
      )}
    >
      <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
        <fieldset disabled={submitting}>
          <UserFormFields form={form} onChange={handleChange} />
        </fieldset>
      </form>
    </Modal>
  );
}
