import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="weave" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="46" stroke="#D4A94E" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#weave)" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-camel text-sm tracking-[0.3em] font-semibold mb-4">دوخت دست، طراحی ایرانی</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-cream leading-tight mb-6">
            پوشاکی برای
            <br />
            <span className="text-camel">سبک زندگی شما</span>
          </h1>
          <p className="text-cream/70 text-lg leading-8 mb-10 max-w-md">
            از پیراهن‌های کتان تا کیف و کفش چرم دست‌دوز؛ کیفیتی که با هر بار پوشیدن حس می‌کنید.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/#products"
              className="bg-camel hover:bg-camel-light text-forest font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 glow-camel"
            >
              مشاهده کالکشن
            </Link>
            <Link
              to="/#story"
              className="border border-cream/30 hover:border-camel text-cream font-medium px-8 py-4 rounded-full transition-colors"
            >
              داستان برند
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="aspect-square rounded-full bg-gradient-to-br from-camel via-camel-dark to-rust p-2">
            <div className="w-full h-full rounded-full bg-forest-dark flex items-center justify-center">
              <span className="text-cream/80 text-center px-8 text-sm leading-7">
                ضمانت اصالت جنس
                <span className="text-3xl font-black block mt-2 text-camel">۱۰۰٪</span>
                دوخت ایرانی
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
