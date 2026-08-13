const POINTS = ["ارسال به سراسر ایران", "امکان تعویض سایز رایگان", "دوخت و پارچهٔ باکیفیت"];

export default function StorySection() {
  return (
    <section className="bg-forest">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <p className="text-camel text-sm tracking-[0.3em] font-semibold mb-4">داستان برند</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-cream mb-6 leading-relaxed">
            از کارگاه خیاطی تا کمد لباس شما
          </h2>
          <p className="text-cream/70 leading-8 mb-6">
            رخت‌آرا با همکاری استادکاران خیاطی و چرم‌دوزی ایرانی، محصولاتی می‌سازد که کیفیت دوخت و پارچه در اولویت
            اول آن‌هاست. هر قطعه پیش از ارسال از نظر دوخت، اندازه و کیفیت پارچه بررسی می‌شود.
          </p>
          <ul className="space-y-3 text-cream/80">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-camel" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-56 h-56 rounded-full border-4 border-camel flex items-center justify-center text-center p-6 -rotate-[8deg]">
            <span className="font-black leading-8 text-camel">
              دوخت
              <br />
              دست‌ساز
              <br />
              <span className="text-sm font-normal text-cream">رخت‌آرا</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
