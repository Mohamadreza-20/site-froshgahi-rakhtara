import { Mail } from "lucide-react";
import NewsletterForm from "./newsletter/NewsletterForm";
import { useNewsletterForm } from "../../lib/hooks/useNewsletterForm";

export default function Newsletter() {
  const form = useNewsletterForm();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rust to-rust-light" aria-labelledby="newsletter-title">
      <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-forest/25 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 text-cream mb-5"><Mail size={24} aria-hidden="true" /></span>
        <h2 id="newsletter-title" className="text-2xl md:text-3xl font-extrabold text-cream mb-3">از کالکشن‌های جدید باخبر شوید</h2>
        <p className="text-cream/70 mb-8 max-w-md mx-auto">عضو خبرنامهٔ رخت‌آرا شوید و از تخفیف‌های فصلی جا نمانید</p>
        <NewsletterForm email={form.email} error={form.error} subscribed={form.subscribed} onChange={form.changeEmail} onSubmit={form.submit} />
        <p className="text-xs text-cream/50 mt-4">ایمیل شما فقط برای اطلاع‌رسانی تخفیف‌ها استفاده می‌شود، بدون اسپم.</p>
      </div>
    </section>
  );
}
