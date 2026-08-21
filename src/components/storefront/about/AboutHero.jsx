import OptimizedImage from "../../shared/OptimizedImage";
import { Link } from "react-router-dom";
import { Award } from "./about.data";

export default function AboutHero() {
	return <section className="max-w-7xl mx-auto px-6 pb-16">
		<div className="grid md:grid-cols-2 gap-12 items-center">
			<div>
				<p className="text-rust text-sm tracking-[0.3em] font-semibold mb-4">درباره رخت‌آرا</p>
				<h1 className="text-3xl md:text-4xl font-extrabold text-forest mb-6 leading-relaxed">پوشاک و اکسسوری اصیل ایرانی، با دوخت و کیفیتی که حسش می‌کنید</h1>
				<p className="text-lg leading-8 text-ink/70 mb-4">رخت‌آرا از دل یک کارگاه خیاطی کوچک شروع شد و امروز به فروشگاهی تبدیل شده که پوشاک، کیف، کفش و اکسسوری با کیفیت را با دوخت دست‌ساز به دست مشتریانش در سراسر ایران می‌رساند.</p>
				<p className="leading-8 text-ink/60 mb-8">ما به جای تولید انبوه، روی کیفیت پارچه، دقت دوخت و رضایت واقعی مشتری تمرکز کرده‌ایم؛ همین باعث شده هر قطعه رخت‌آرا داستان خودش را داشته باشد.</p>
				<div className="flex flex-wrap items-center gap-3"><Link to="/contact-us" className="font-bold px-8 py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream transition-transform hover:scale-[1.02] shadow-lg shadow-forest/20">تماس با ما</Link><Link to="/#products" className="font-bold px-8 py-3.5 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-cream transition-colors">مشاهده محصولات</Link></div>
			</div>
			<div className="relative">
				<div className="rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-cream-dark to-camel-light/40 flex items-center justify-center h-[320px] md:h-[420px]"><OptimizedImage src="/images/showcase-fashion.svg" alt="پوشاک رخت‌آرا" width="640" height="480" className="w-full h-full object-cover" /></div>
				<div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white border border-ink/10 rounded-2xl px-5 py-4 shadow-xl"><span className="w-11 h-11 rounded-full bg-camel/20 flex items-center justify-center text-forest"><Award size={20} aria-hidden="true" /></span><div><p className="font-bold text-forest text-sm">دوخت دست‌ساز</p><p className="text-xs text-ink/50">استادکاران ایرانی</p></div></div>
			</div>
		</div>
	</section>;
}
