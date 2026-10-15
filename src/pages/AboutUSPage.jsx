import { Link } from "react-router-dom";
import {
	ChevronLeft,
	Scissors,
	ShieldCheck,
	Truck,
	Users,
	Award,
	Sparkles,
	MapPin,
	MessageCircle,
} from "lucide-react";

const STATS = [
	{ value: "+۸", label: "سال تجربه در پوشاک" },
	{ value: "+۴۰هزار", label: "مشتری راضی" },
	{ value: "+۶۰۰", label: "محصول متنوع" },
	{ value: "+۳۰", label: "شهر تحت پوشش ارسال" },
];

const VALUES = [
	{
		icon: Scissors,
		title: "دوخت دست‌ساز",
		desc: "هر قطعه توسط استادکاران خیاطی و چرم‌دوزی ایرانی و با دقت دوخته می‌شود.",
	},
	{
		icon: ShieldCheck,
		title: "ضمانت اصالت جنس",
		desc: "پارچه و متریال محصولات پیش از تولید از نظر کیفیت بررسی و تضمین می‌شود.",
	},
	{
		icon: Truck,
		title: "ارسال سریع و مطمئن",
		desc: "ارسال به سراسر ایران با بسته‌بندی ایمن و امکان تعویض سایز رایگان.",
	},
	{
		icon: MessageCircle,
		title: "پشتیبانی همیشگی",
		desc: "تیم پشتیبانی رخت‌آرا هر روز هفته پاسخ‌گوی سوالات و پیگیری سفارش شماست.",
	},
];

const TIMELINE = [
	{
		year: "۱۳۹۶",
		title: "شروع کار در یک کارگاه کوچک",
		desc: "رخت‌آرا با یک کارگاه خیاطی کوچک در تهران و تمرکز بر پوشاک زنانه فعالیتش را آغاز کرد.",
	},
	{
		year: "۱۴۰۰",
		title: "گسترش به کیف، کفش و اکسسوری",
		desc: "با اعتماد مشتریان، خط تولید به کیف، کفش و اکسسوری چرمی هم گسترش پیدا کرد.",
	},
	{
		year: "۱۴۰۴",
		title: "فروشگاه آنلاین رخت‌آرا",
		desc: "امروز رخت‌آرا با فروشگاه اینترنتی خود، محصولاتش را به سراسر ایران ارسال می‌کند.",
	},
];

export default function AboutUSPage() {
	return (
		<div>
			<div className="max-w-7xl mx-auto px-6 pt-10">
				<div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
					<Link to="/" className="hover:underline text-forest">
						خانه
					</Link>
					<ChevronLeft size={14} />
					<span>درباره ما</span>
				</div>
			</div>

			<section className="max-w-7xl mx-auto px-6 pb-16">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<p className="text-rust text-sm tracking-[0.3em] font-semibold mb-4">
							درباره رخت‌آرا
						</p>
						<h1 className="text-3xl md:text-4xl font-extrabold text-forest mb-6 leading-relaxed">
							پوشاک و اکسسوری اصیل ایرانی، با دوخت و کیفیتی که حسش می‌کنید
						</h1>
						<p className="text-lg leading-8 text-ink/70 mb-4">
							رخت‌آرا از دل یک کارگاه خیاطی کوچک شروع شد و امروز به فروشگاهی
							تبدیل شده که پوشاک، کیف، کفش و اکسسوری با کیفیت را با دوخت
							دست‌ساز به دست مشتریانش در سراسر ایران می‌رساند.
						</p>
						<p className="leading-8 text-ink/60 mb-8">
							ما به جای تولید انبوه، روی کیفیت پارچه، دقت دوخت و رضایت واقعی
							مشتری تمرکز کرده‌ایم؛ همین باعث شده هر قطعه رخت‌آرا داستان خودش
							را داشته باشد.
						</p>
						<div className="flex flex-wrap items-center gap-3">
							<Link
								to="/contact-us"
								className="font-bold px-8 py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream transition-transform hover:scale-[1.02] shadow-lg shadow-forest/20"
							>
								تماس با ما
							</Link>
							<Link
								to="/#products"
								className="font-bold px-8 py-3.5 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-cream transition-colors"
							>
								مشاهده محصولات
							</Link>
						</div>
					</div>

					<div className="relative">
						<div className="rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-cream-dark to-camel-light/40 flex items-center justify-center h-[320px] md:h-[420px]">
							<img
								src="/images/showcase-fashion.svg"
								alt="پوشاک رخت‌آرا"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white border border-ink/10 rounded-2xl px-5 py-4 shadow-xl">
							<span className="w-11 h-11 rounded-full bg-camel/20 flex items-center justify-center text-forest">
								<Award size={20} />
							</span>
							<div>
								<p className="font-bold text-forest text-sm">دوخت دست‌ساز</p>
								<p className="text-xs text-ink/50">استادکاران ایرانی</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="border-y border-ink/10 bg-white">
				<div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					{STATS.map((stat) => (
						<div key={stat.label}>
							<p className="text-2xl md:text-3xl font-extrabold text-forest mb-1">
								{stat.value}
							</p>
							<p className="text-sm text-ink/50">{stat.label}</p>
						</div>
					))}
				</div>
			</section>

			<section className="max-w-7xl mx-auto px-6 py-20">
				<div className="text-center max-w-2xl mx-auto mb-14">
					<p className="text-rust text-sm tracking-[0.3em] font-semibold mb-3">
						چرا رخت‌آرا؟
					</p>
					<h2 className="text-3xl font-extrabold text-forest mb-3">
						چیزی که ما را متفاوت می‌کند
					</h2>
					<p className="text-ink/60">
						از انتخاب پارچه تا بسته‌بندی نهایی، هر مرحله با دقت و برای رضایت
						شما طراحی شده است.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{VALUES.map(({ icon: Icon, title, desc }) => (
						<div
							key={title}
							className="bg-white border border-ink/10 rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-1"
						>
							<span className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-4">
								<Icon size={22} />
							</span>
							<h3 className="font-bold text-forest mb-2">{title}</h3>
							<p className="text-sm leading-7 text-ink/60">{desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className="bg-forest">
				<div className="max-w-7xl mx-auto px-6 py-24">
					<div className="max-w-2xl mb-16">
						<p className="text-camel text-sm tracking-[0.3em] font-semibold mb-4">
							مسیر رخت‌آرا
						</p>
						<h2 className="text-3xl md:text-4xl font-extrabold text-cream leading-relaxed">
							از یک کارگاه کوچک تا فروشگاهی برای سراسر ایران
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-10">
						{TIMELINE.map((timelineItem, index) => (
							<div key={timelineItem.year} className="relative">
								<div className="flex items-center gap-3 mb-4">
									<span className="w-10 h-10 rounded-full bg-camel text-forest font-extrabold flex items-center justify-center text-sm">
										{index + 1}
									</span>
									<span className="text-camel font-extrabold text-lg">
										{timelineItem.year}
									</span>
								</div>
								<h3 className="text-cream font-bold mb-2">{timelineItem.title}</h3>
								<p className="text-cream/70 text-sm leading-7">{timelineItem.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="max-w-7xl mx-auto px-6 py-20">
				<div className="grid md:grid-cols-3 gap-8">
					<div className="md:col-span-1 bg-camel/15 rounded-3xl p-8 flex flex-col justify-center">
						<Users className="text-forest mb-4" size={28} />
						<h3 className="font-extrabold text-forest text-xl mb-3">
							تیم رخت‌آرا
						</h3>
						<p className="text-sm leading-7 text-ink/60">
							ترکیبی از طراحان، استادکاران خیاطی و تیم پشتیبانی که همه با یک
							هدف کار می‌کنند: رضایت شما از خرید.
						</p>
					</div>
					<div className="md:col-span-2 bg-white border border-ink/10 rounded-3xl p-8 flex flex-col justify-center gap-6">
						<div className="flex items-start gap-4">
							<span className="shrink-0 w-11 h-11 rounded-full bg-camel/20 flex items-center justify-center text-forest">
								<Sparkles size={20} />
							</span>
							<p className="leading-8 text-ink/70">
								ما معتقدیم لباس و اکسسوری خوب باید هم زیبا باشد و هم برای
								سال‌ها همراه شما بماند؛ به همین دلیل کیفیت را فدای سرعت تولید
								نمی‌کنیم.
							</p>
						</div>
						<div className="flex items-start gap-4">
							<span className="shrink-0 w-11 h-11 rounded-full bg-camel/20 flex items-center justify-center text-forest">
								<MapPin size={20} />
							</span>
							<p className="leading-8 text-ink/70">
								دفتر و کارگاه اصلی رخت‌آرا در تهران است، اما محصولات ما همین
								امروز به بیش از سی شهر ایران ارسال می‌شود.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="max-w-7xl mx-auto px-6 pb-24">
				<div className="bg-forest-dark rounded-[2rem] px-8 py-14 text-center">
					<h2 className="text-2xl md:text-3xl font-extrabold text-cream mb-4">
						سوالی درباره محصولات یا سفارشتان دارید؟
					</h2>
					<p className="text-cream/70 mb-8 max-w-xl mx-auto">
						تیم رخت‌آرا آماده پاسخ‌گویی به شماست؛ همین حالا با ما در ارتباط
						باشید.
					</p>
					<Link
						to="/contact-us"
						className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full bg-camel hover:bg-camel-light text-forest-dark transition-transform hover:scale-[1.02] shadow-lg"
					>
						تماس با ما
					</Link>
				</div>
			</section>
		</div>
	);
}
