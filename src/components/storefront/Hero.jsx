import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { toman } from "../../lib/data/products";

const HERO_PRODUCTS = [
	{ name: "پیراهن کتان مردانه", price: 890000, image: "/images/product-1.svg" },
	{
		name: "کیف دستی چرم زنانه",
		price: 1450000,
		image: "/images/product-2.svg",
	},
];

export default function Hero() {
	return (
		<section className="relative overflow-hidden bg-forest">
			<svg
				className="absolute inset-0 w-full h-full opacity-10"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<pattern
						id="weave"
						width="46"
						height="46"
						patternUnits="userSpaceOnUse"
						patternTransform="rotate(45)"
					>
						<line
							x1="0"
							y1="0"
							x2="0"
							y2="46"
							stroke="#D4A94E"
							strokeWidth="1"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#weave)" />
			</svg>

			<div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-camel/20 blur-3xl" />

			<div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
				<div>
					<p className="text-camel text-sm tracking-[0.3em] font-semibold mb-4">
						دوخت دست، طراحی ایرانی
					</p>
					<h1 className="text-4xl md:text-6xl font-extrabold text-cream leading-tight mb-6">
						پوشاکی برای
						<br />
						<span className="text-camel">سبک زندگی شما</span>
					</h1>
					<p className="text-cream/70 text-lg leading-8 mb-10 max-w-md">
						از پیراهن‌های کتان تا کیف و کفش چرم دست‌دوز؛ کیفیتی که با هر بار
						پوشیدن حس می‌کنید.
					</p>
					<div className="flex flex-wrap gap-4 mb-10">
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
					<div className="flex flex-wrap gap-x-7 gap-y-2 text-xs text-cream/50">
						<span>ارسال به سراسر ایران</span>
						<span>ضمانت اصالت کالا</span>
						<span>۷ روز مهلت بازگشت</span>
					</div>
				</div>

				<div className="relative hidden md:block h-[460px]">
					<div className="absolute top-2 right-6 w-[380px] h-[380px] rounded-full bg-gradient-to-br from-camel via-camel-dark to-rust opacity-90" />

					<div className="absolute top-6 right-16 w-56 rounded-[1.5rem] bg-cream p-3 shadow-2xl shadow-black/30 rotate-[-4deg] hover:rotate-0 transition-transform duration-500">
						<div className="aspect-square rounded-2xl overflow-hidden bg-forest-dark">
							<img
								src={HERO_PRODUCTS[0].image}
								alt={HERO_PRODUCTS[0].name}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="pt-3 pb-1 px-1 text-right">
							<p className="text-sm font-bold text-ink">
								{HERO_PRODUCTS[0].name}
							</p>
							<p className="text-xs text-forest font-semibold mt-1">
								{toman(HERO_PRODUCTS[0].price)}
							</p>
						</div>
					</div>

					<div className="absolute bottom-2 left-0 w-48 rounded-[1.5rem] bg-cream p-3 shadow-2xl shadow-black/30 rotate-[5deg] hover:rotate-0 transition-transform duration-500">
						<div className="aspect-[4/3] rounded-2xl overflow-hidden bg-rust/80">
							<img
								src={HERO_PRODUCTS[1].image}
								alt={HERO_PRODUCTS[1].name}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="pt-3 pb-1 px-1 text-right">
							<p className="text-sm font-bold text-ink">
								{HERO_PRODUCTS[1].name}
							</p>
							<p className="text-xs text-forest font-semibold mt-1">
								{toman(HERO_PRODUCTS[1].price)}
							</p>
						</div>
					</div>

					<div className="absolute -bottom-4 right-24 flex items-center gap-2.5 bg-white rounded-full pl-5 pr-4 py-3 shadow-xl shadow-black/20">
						<ShieldCheck size={18} className="text-forest shrink-0" />
						<span className="text-xs font-bold text-ink whitespace-nowrap">
							۱۰۰٪ ضمانت اصالت
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
