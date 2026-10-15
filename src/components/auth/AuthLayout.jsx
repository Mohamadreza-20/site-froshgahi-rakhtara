import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Toaster } from "sonner";

export default function AuthLayout({ tab, setTab, children }) {
	return (
		<div
			dir="rtl"
			className="relative h-screen bg-cream font-vazir text-ink flex items-center justify-center px-4 py-6 overflow-hidden"
		>
			<Toaster
				position="top-center"
				dir="rtl"
				richColors
				closeButton
				toastOptions={{
					style: { fontFamily: "Vazirmatn, sans-serif", textAlign: "right" },
				}}
			/>
			<svg
				className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<pattern
						id="auth-weave"
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
							stroke="#0e6b4f"
							strokeWidth="1"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#auth-weave)" />
			</svg>
			<div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-forest/10 blur-3xl pointer-events-none" />
			<div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-camel/20 blur-3xl pointer-events-none" />

			<Link
				to="/"
				className="group absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 text-sm font-bold text-forest bg-white/80 backdrop-blur border border-forest/15 pl-4 pr-3.5 py-2.5 rounded-full shadow-sm shadow-ink/[0.04] transition-all hover:bg-forest hover:text-cream hover:shadow-md hover:shadow-forest/20"
			>
				<Home
					size={16}
					className="transition-transform group-hover:-translate-x-0.5"
				/>
				بازگشت به صفحه اصلی
			</Link>

			<div className="relative w-full max-w-sm max-h-full py-4">
				<Link to="/" className="flex flex-col items-center gap-3 mb-8">
					<span className="w-14 h-14 rounded-full bg-gradient-to-br from-forest to-forest-dark text-camel flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-forest/20">
						ر
					</span>
					<span className="flex flex-col items-center leading-tight">
						<span className="font-extrabold text-2xl text-forest">رخت‌آرا</span>
						<span className="text-[11px] tracking-widest text-ink/50">
							FASHION & ACCESSORY
						</span>
					</span>
				</Link>

				<div className="bg-white rounded-3xl border border-camel/15 shadow-xl shadow-ink/[0.06] p-6 sm:p-8">
					<div className="relative grid grid-cols-2 mb-8 bg-cream rounded-full p-1 border border-ink/10">
						<span
							aria-hidden="true"
							className={`absolute inset-y-1 right-1 w-[calc(50%-4px)] rounded-full bg-forest transition-transform duration-300 ease-out ${
								tab === "register" ? "-translate-x-full" : "translate-x-0"
							}`}
						/>
						<button
							type="button"
							onClick={() => setTab("login")}
							className={`relative z-10 cursor-pointer flex-1 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
								tab === "login" ? "text-cream" : "text-ink/60"
							}`}
						>
							ورود
						</button>
						<button
							type="button"
							onClick={() => setTab("register")}
							className={`relative z-10 cursor-pointer flex-1 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
								tab === "register" ? "text-cream" : "text-ink/60"
							}`}
						>
							ثبت‌نام
						</button>
					</div>

					<div key={tab} className="auth-form-in">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
