import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { usePageMeta } from "../lib/hooks/usePageMeta";

function Forbidden() {
	usePageMeta({ title: "دسترسی غیرمجاز | Rakhtara", description: "دسترسی به این بخش از Rakhtara مجاز نیست.", robots: "noindex, nofollow" });
	return (
		<div
			dir="rtl"
			className="min-h-screen flex flex-col items-center justify-center gap-4 bg-cream text-ink px-6 text-center"
		>
			<ShieldAlert size={56} className="text-rust" />
			<h1 className="text-2xl font-extrabold">دسترسی غیرمجاز</h1>
			<p className="text-ink/60 max-w-sm">
				شما اجازه ورود به این بخش را ندارید. برای دسترسی به پنل کاربری باید
				حساب شما توسط مدیر فروشگاه تأیید شده باشد.
			</p>
			<Link
				to="/"
				className="mt-2 px-5 py-2.5 rounded-full bg-forest text-cream text-sm font-bold hover:bg-forest-light transition-colors"
			>
				بازگشت به صفحه اصلی
			</Link>
		</div>
	);
}

export default Forbidden;
