import { Link } from "react-router-dom";
export default function HeroCopy() {
  return <div>
    <p className="text-camel text-sm tracking-[0.3em] font-semibold mb-4">دوخت دست، طراحی ایرانی</p>
    <h1 id="hero-title" className="text-4xl md:text-6xl font-extrabold text-cream leading-tight mb-6">پوشاکی برای<br /><span className="text-camel">سبک زندگی شما</span></h1>
    <p className="text-cream/70 text-lg leading-8 mb-10 max-w-md">از پیراهن‌های کتان تا کیف و کفش چرم دست‌دوز؛ کیفیتی که با هر بار پوشیدن حس می‌کنید.</p>
    <div className="flex flex-wrap gap-4 mb-10"><Link to="/#products" className="bg-camel hover:bg-camel-light text-forest font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 glow-camel">مشاهده کالکشن</Link><Link to="/#story" className="border border-cream/30 hover:border-camel text-cream font-medium px-8 py-4 rounded-full transition-colors">داستان برند</Link></div>
    <div className="flex flex-wrap gap-x-7 gap-y-2 text-xs text-cream/50"><span>ارسال به سراسر ایران</span><span>ضمانت اصالت کالا</span><span>۷ روز مهلت بازگشت</span></div>
  </div>;
}
