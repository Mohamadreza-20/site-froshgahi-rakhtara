import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useContactInfoQuery } from "../lib/hooks/cms/useContactQueries";
import ContactInfo from "../components/storefront/contact/ContactInfo";
import ContactForm from "../components/storefront/contact/ContactForm";
import { usePageMeta } from "../lib/hooks/usePageMeta";

export default function ContactUsPage() {
  usePageMeta({ title: "تماس با ما | Rakhtara", description: "راه‌های ارتباطی و فرم تماس با فروشگاه Rakhtara.", path: "/contact-us" });
  const { user } = useAuthContext();
  const { data, isLoading, isError, refetch } = useContactInfoQuery();
  return <div className="max-w-7xl mx-auto px-6 py-10">
    <div className="flex items-center gap-2 text-sm mb-8 text-ink/50"><Link to="/" className="hover:underline text-forest">خانه</Link><ChevronLeft size={14}/><span>تماس با ما</span></div>
    <div className="mb-12 text-center max-w-2xl mx-auto"><h1 className="text-3xl md:text-4xl font-extrabold text-forest mb-3">تماس با ما</h1><p className="text-ink/60">سوالی دارید یا نیاز به راهنمایی دارید؟ فرم زیر را پر کنید یا از راه‌های زیر با ما در ارتباط باشید.</p></div>
    <div className="grid md:grid-cols-5 gap-10 mb-10"><div className="md:col-span-2"><ContactInfo data={data} loading={isLoading} error={isError} onRetry={refetch}/></div><ContactForm user={user}/></div>
  </div>;
}
