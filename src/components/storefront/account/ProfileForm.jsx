import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { updateProfile } from "../../../services/account/profile.service";
import { getZodErrors, updateProfileSchema } from "../../../utils/validators";

const inputClass = (hasError) =>
  `w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors text-right ${hasError ? "border-rust" : "border-ink/15"}`;

export default function ProfileForm({ user, onSaved }) {
  const [form, setForm] = useState({ fullName: user.name || "", email: user.email || "", phone: user.phone || "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = getZodErrors(updateProfileSchema, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    const result = await updateProfile(user.id, form);
    setLoading(false);
    if (result.success) {
      onSaved(result.data);
      toast.success("اطلاعات شما با موفقیت بروزرسانی شد");
    } else {
      toast.error(result.error || "بروزرسانی اطلاعات ناموفق بود");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5">
      <div><h2 className="font-extrabold text-lg text-forest">ویرایش اطلاعات</h2><p className="text-sm text-ink/50 mt-1">اطلاعات حساب کاربری خود را در صورت نیاز تغییر دهید.</p></div>
      <FormField id="account-full-name" label="نام و نام خانوادگی" value={form.fullName} onChange={handleChange("fullName")} error={errors.fullName} placeholder="نام شما" inputClass={inputClass(errors.fullName)} />
      <FormField id="account-email" label="ایمیل" type="email" dir="ltr" value={form.email} onChange={handleChange("email")} error={errors.email} placeholder="name@gmail.com" inputClass={inputClass(errors.email)} />
      <FormField id="account-phone" label="شماره موبایل" type="tel" dir="ltr" value={form.phone} onChange={handleChange("phone")} error={errors.phone} placeholder="0912xxxxxxx" inputClass={inputClass(errors.phone)} />
      <button type="submit" disabled={loading} className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-forest/20">
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  );
}

function FormField({ id, label, error, inputClass: className, ...props }) {
  return <div><label htmlFor={id} className="block text-sm font-bold mb-2 text-ink/70">{label}</label><input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={className} {...props} />{error && <p id={`${id}-error`} className="text-xs text-rust mt-1.5" role="alert">{error}</p>}</div>;
}
