import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "../../../services/account/profile.service";
import { changePasswordSchema, getZodErrors } from "../../../utils/validators";

const emptyForm = { currentPassword: "", newPassword: "", confirmNewPassword: "" };
const inputClass = (hasError) => `w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors text-right ${hasError ? "border-rust" : "border-ink/15"}`;

export default function PasswordForm({ user }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = getZodErrors(changePasswordSchema, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    const result = await changePassword(user.id, form);
    setLoading(false);
    if (result.success) {
      toast.success("رمز عبور با موفقیت تغییر کرد");
      setForm(emptyForm);
    } else toast.error(result.error || "تغییر رمز عبور ناموفق بود");
  };
  return <form onSubmit={handleSubmit} noValidate className="bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5">
    <div><h2 className="font-extrabold text-lg text-forest flex items-center gap-2"><KeyRound size={18} />تغییر رمز عبور</h2><p className="text-sm text-ink/50 mt-1">برای تغییر رمز عبور، ابتدا رمز فعلی خود را وارد کنید.</p></div>
    <PasswordField id="account-current-password" label="رمز عبور فعلی" value={form.currentPassword} onChange={handleChange("currentPassword")} error={errors.currentPassword} placeholder="رمز عبور فعلی" />
    <div className="grid sm:grid-cols-2 gap-5"><PasswordField id="account-new-password" label="رمز عبور جدید" value={form.newPassword} onChange={handleChange("newPassword")} error={errors.newPassword} placeholder="حداقل ۸ کاراکتر" /><PasswordField id="account-confirm-password" label="تکرار رمز عبور جدید" value={form.confirmNewPassword} onChange={handleChange("confirmNewPassword")} error={errors.confirmNewPassword} placeholder="تکرار رمز عبور جدید" /></div>
    <button type="submit" disabled={loading} className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-full bg-ink/90 hover:bg-ink text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100">{loading ? <Loader2 size={18} className="animate-spin" /> : <KeyRound size={18} />}{loading ? "در حال تغییر..." : "تغییر رمز عبور"}</button>
  </form>;
}

function PasswordField({ id, label, error, ...props }) {
  return <div><label htmlFor={id} className="block text-sm font-bold mb-2 text-ink/70">{label}</label><input id={id} type="password" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={inputClass(error)} {...props} />{error && <p id={`${id}-error`} className="text-xs text-rust mt-1.5" role="alert">{error}</p>}</div>;
}
