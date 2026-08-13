import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { newsletterSchema } from "../../utils/validators";

export default function Newsletter() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [justSubscribed, setJustSubscribed] = useState(false);

	function handleChange(e) {
		setEmail(e.target.value);
		if (error) setError("");
	}

	function handleSubmit(e) {
		e.preventDefault();
		const result = newsletterSchema.safeParse({ email });
		if (!result.success) {
			setError(result.error.issues[0].message);
			return;
		}

		toast.success("عضویت شما ثبت شد", {
			description: "از این به بعد از تخفیف‌های فصلی باخبر می‌شوید",
		});
		setEmail("");
		setError("");
		setJustSubscribed(true);
		window.setTimeout(() => setJustSubscribed(false), 2500);
	}

	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-rust to-rust-light">
			<div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
			<div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-forest/25 blur-3xl pointer-events-none" />

			<div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
				<span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 text-cream mb-5">
					<Mail size={24} />
				</span>

				<h2 className="text-2xl md:text-3xl font-extrabold text-cream mb-3">
					از کالکشن‌های جدید باخبر شوید
				</h2>
				<p className="text-cream/70 mb-8 max-w-md mx-auto">
					عضو خبرنامهٔ رخت‌آرا شوید و از تخفیف‌های فصلی جا نمانید
				</p>

				<form
					noValidate
					onSubmit={handleSubmit}
					className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-start"
				>
					<div className="w-full flex-1">
						<div className="relative">
							<Mail
								size={18}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/35 pointer-events-none"
							/>
							<input
								type="email"
								inputMode="email"
								value={email}
								onChange={handleChange}
								placeholder="ایمیل شما"
								aria-label="ایمیل برای عضویت در خبرنامه"
								aria-invalid={Boolean(error)}
								aria-describedby={error ? "newsletter-error" : undefined}
								className={`w-full bg-white pr-11 pl-5 py-3 rounded-full text-ink placeholder:text-ink/40 outline-none ring-2 transition-shadow ${
									error
										? "ring-red-400 focus:ring-red-400"
										: "ring-transparent focus:ring-camel"
								}`}
							/>
						</div>
						{error && (
							<p
								id="newsletter-error"
								role="alert"
								className="text-xs text-white bg-red-500/25 rounded-lg px-3 py-1.5 mt-2 text-right"
							>
								{error}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="cursor-pointer shrink-0 flex items-center justify-center gap-2 bg-camel hover:bg-camel-light text-forest font-bold px-6 py-3 rounded-full transition-all hover:scale-[1.02] glow-camel"
					>
						{justSubscribed ? (
							<CheckCircle2 size={18} />
						) : (
							<Send size={18} />
						)}
						عضویت
					</button>
				</form>

				<p className="text-xs text-cream/50 mt-4">
					ایمیل شما فقط برای اطلاع‌رسانی تخفیف‌ها استفاده می‌شود، بدون اسپم.
				</p>
			</div>
		</section>
	);
}
