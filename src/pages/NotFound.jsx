import { Link } from "react-router-dom";

export default function NotFoundPage() {
	return (
		<div className="max-w-7xl mx-auto px-6 py-24 text-center">
			<p className="text-6xl font-extrabold text-forest mb-4">۴۰۴</p>
			<p className="text-lg text-ink/60 mb-8">
				صفحه‌ای که دنبالش می‌گردید پیدا نشد
			</p>
			<Link
				to="/"
				className="inline-block font-bold px-6 py-3 rounded-full bg-forest text-cream hover:bg-forest-light transition-colors"
			>
				بازگشت به خانه
			</Link>
		</div>
	);
}
