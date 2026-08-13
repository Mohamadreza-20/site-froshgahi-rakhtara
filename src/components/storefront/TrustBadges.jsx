import { Truck, ShieldCheck, Scissors, MessageCircle } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "ارسال سریع", sub: "تحویل ۲۴ تا ۹۶ ساعته" },
  { icon: ShieldCheck, title: "ضمانت اصالت جنس", sub: "بازگشت وجه تا ۷ روز" },
  { icon: Scissors, title: "دوخت دست‌ساز", sub: "کیفیت استادکاران ایرانی" },
  { icon: MessageCircle, title: "پشتیبانی همیشگی", sub: "پاسخ‌گویی هر روز هفته" },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {ITEMS.map(({ icon: Icon, title, sub }) => (
          <div key={title}>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-forest/5 text-forest flex items-center justify-center">
              <Icon size={22} />
            </div>
            <p className="font-bold text-sm text-forest">{title}</p>
            <p className="text-xs mt-1 text-ink/50">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
