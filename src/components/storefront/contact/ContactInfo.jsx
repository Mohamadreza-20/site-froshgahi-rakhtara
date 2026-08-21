import { Mail, MapPin, Phone } from "lucide-react";
import { QueryErrorState, QueryLoadingState } from "../../shared/states/QueryStates";

export default function ContactInfo({ data, loading, error, onRetry }) {
  if (loading) return <QueryLoadingState message="در حال بارگذاری اطلاعات تماس..." />;
  if (error) return <QueryErrorState message="دریافت اطلاعات تماس ناموفق بود" onRetry={onRetry} />;
  const items = [
    { icon: MapPin, label: "آدرس", value: data?.address },
    { icon: Phone, label: "شماره تماس", value: data?.phone, dir: "ltr" },
    { icon: Mail, label: "ایمیل", value: data?.email, dir: "ltr" },
  ];
  return <div className="space-y-4">{items.map(({ icon: Icon, label, value, dir }) => <div key={label} className="flex items-start gap-4 bg-white border border-ink/10 rounded-3xl p-5"><span className="shrink-0 w-11 h-11 rounded-full bg-camel/20 flex items-center justify-center text-forest"><Icon size={20} /></span><div><p className="text-xs text-ink/50 mb-1">{label}</p><p dir={dir} className="font-bold text-forest">{value}</p></div></div>)}</div>;
}
