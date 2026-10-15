import { memo } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../lib/data/products";

function Footer() {
	return (
		<footer className="bg-forest-dark">
			<div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
				<div>
					<div className="flex items-center gap-3 mb-4">
						<span className="w-10 h-10 rounded-full bg-camel flex items-center justify-center text-forest font-extrabold">
							ر
						</span>
						<span className="font-extrabold text-cream text-lg">رخت‌آرا</span>
					</div>
					<p className="text-cream/60 text-sm leading-7">
						پوشاک و اکسسوری اصیل ایرانی، دوخت و کیفیتی که با هر بار پوشیدن حس
						می‌کنید.
					</p>
				</div>
				<div>
					<h4 className="text-cream font-bold mb-4">دسترسی سریع</h4>
					<ul className="space-y-2 text-cream/60 text-sm">
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<Link
									to={`/${link.href}`}
									className="hover:text-camel transition-colors"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h4 className="text-cream font-bold mb-4">پشتیبانی</h4>
					<ul className="space-y-2 text-cream/60 text-sm">
						<li>سوالات متداول</li>
						<li>راهنمای سایز</li>
						<li>بازگشت و تعویض کالا</li>
						<li>حریم خصوصی</li>
					</ul>
				</div>
				<div>
					<h4 className="text-cream font-bold mb-4">ارتباط با ما</h4>
					<ul className="space-y-2 text-cream/60 text-sm">
						<li>تهران، خیابان ولیعصر</li>
						<li dir="ltr" className="text-right">
							021-77777777
						</li>
						<li>info@rakhtara.ir</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-cream/10 py-6 text-center text-cream/40 text-xs">
				© ۱۴۰۴ رخت‌آرا. تمامی حقوق محفوظ است.
			</div>
		</footer>
	);
}

export default memo(Footer);
