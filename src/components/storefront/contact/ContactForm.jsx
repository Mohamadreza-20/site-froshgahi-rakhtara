import { Loader2, Send } from "lucide-react";
import ContactField from "./ContactField";
import { useContactForm } from "../../../lib/hooks/useContactForm";

export default function ContactForm({ user }) {
  const { form, errors, mutation, change, submit } = useContactForm(user);
  return (
    <form onSubmit={submit} noValidate aria-busy={mutation.isPending} className="md:col-span-3 bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <ContactField id="contact-name" label="نام و نام خانوادگی" autoComplete="name" value={form.name} onChange={change("name")} error={errors.name} placeholder="نام شما" />
        <ContactField id="contact-phone" label="شماره موبایل (اختیاری)" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" value={form.phone} onChange={change("phone")} error={errors.phone} placeholder="0912xxxxxxx" />
      </div>
      <ContactField id="contact-email" label="ایمیل" type="email" inputMode="email" dir="ltr" autoComplete="email" value={form.email} onChange={change("email")} error={errors.email} placeholder="name@email.com" />
      <ContactField id="contact-message" label="پیام شما" multiline value={form.message} onChange={change("message")} error={errors.message} placeholder="پیام خود را بنویسید..." />
      <button type="submit" disabled={mutation.isPending} className="cursor-pointer inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30">
        {mutation.isPending ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
        {mutation.isPending ? "در حال ارسال..." : "ارسال پیام"}
      </button>
    </form>
  );
}
