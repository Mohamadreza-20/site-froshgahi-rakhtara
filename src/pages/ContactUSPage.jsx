import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ChevronLeft, MapPin, Phone, Mail, Loader2, Send } from "lucide-react";
import { contactSchema, getZodErrors } from "../utils/validators";
import { sendContactUsMessage, getContactInfo } from "../services/contactUs.service";
import { useAuthContext } from "../context/AuthContext";

const emptyForm = { name: "", email: "", phone: "", message: "" };

export default function ContactUSPage() {
	const { user } = useAuthContext();
	const [form, setForm] = useState(emptyForm);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const [contactInfo, setContactInfo] = useState(null);

	useEffect(() => {
		let ignore = false;
		getContactInfo()
			.then((data) => {
				if (!ignore) setContactInfo(data);
			})
			.catch((error) => {
				console.error("خطا در دریافت اطلاعات تماس:", error);
			});
		return () => {
			ignore = true;
		};
	}, []);

	const CONTACT_INFO = contactInfo
		? [
				{ icon: MapPin, label: "آدرس", value: contactInfo.address },
				{ icon: Phone, label: "شماره تماس", value: contactInfo.phone, dir: "ltr" },
				{ icon: Mail, label: "ایمیل", value: contactInfo.email, dir: "ltr" },
			]
		: [];

	const handleChange = (field) => (event) => {
		setForm((prev) => ({ ...prev, [field]: event.target.value }));
		if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	async function handleSubmit(event) {
		event.preventDefault();

		const nextErrors = getZodErrors(contactSchema, form);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		setLoading(true);
		try {
			await sendContactUsMessage(form, user?.id);
			toast.success("پیام شما ارسال شد", {
				description: "به‌زودی با شما تماس می‌گیریم",
			});
			setForm(emptyForm);
		} catch (error) {
			console.error("ارسال پیام با خطا مواجه شد:", error);
			toast.error("ارسال پیام ناموفق بود، دوباره تلاش کنید");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="max-w-7xl mx-auto px-6 py-10">
			<div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
				<Link to="/" className="hover:underline text-forest">
					خانه
				</Link>
				<ChevronLeft size={14} />
				<span>تماس با ما</span>
			</div>

			<div className="mb-12 text-center max-w-2xl mx-auto">
				<h1 className="text-3xl md:text-4xl font-extrabold text-forest mb-3">
					تماس با ما
				</h1>
				<p className="text-ink/60">
					سوالی دارید یا نیاز به راهنمایی دارید؟ فرم زیر را پر کنید یا از راه‌های
					زیر با ما در ارتباط باشید.
				</p>
			</div>

			<div className="grid md:grid-cols-5 gap-10 mb-10">
				<div className="md:col-span-2 space-y-4">
					{CONTACT_INFO.map(({ icon: Icon, label, value, dir }) => (
						<div
							key={label}
							className="flex items-start gap-4 bg-white border border-ink/10 rounded-3xl p-5"
						>
							<span className="shrink-0 w-11 h-11 rounded-full bg-camel/20 flex items-center justify-center text-forest">
								<Icon size={20} />
							</span>
							<div>
								<p className="text-xs text-ink/50 mb-1">{label}</p>
								<p dir={dir} className="font-bold text-forest">
									{value}
								</p>
							</div>
						</div>
					))}
				</div>

				<form
					onSubmit={handleSubmit}
					noValidate
					className="md:col-span-3 bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5"
				>
					<div className="grid sm:grid-cols-2 gap-5">
						<div>
							<label className="block text-sm font-bold mb-2 text-ink/70">
								نام و نام خانوادگی
							</label>
							<input
								type="text"
								value={form.name}
								onChange={handleChange("name")}
								placeholder="نام شما"
								className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors ${
									errors.name ? "border-rust" : "border-ink/15"
								}`}
							/>
							{errors.name && (
								<p className="text-xs text-rust mt-1.5">{errors.name}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-bold mb-2 text-ink/70">
								شماره موبایل (اختیاری)
							</label>
							<input
								type="tel"
								dir="ltr"
								value={form.phone}
								onChange={handleChange("phone")}
								placeholder="0912xxxxxxx"
								className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors text-right ${
									errors.phone ? "border-rust" : "border-ink/15"
								}`}
							/>
							{errors.phone && (
								<p className="text-xs text-rust mt-1.5">{errors.phone}</p>
							)}
						</div>
					</div>

					<div>
						<label className="block text-sm font-bold mb-2 text-ink/70">
							ایمیل
						</label>
						<input
							type="email"
							dir="ltr"
							value={form.email}
							onChange={handleChange("email")}
							placeholder="name@email.com"
							className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors text-right ${
								errors.email ? "border-rust" : "border-ink/15"
							}`}
						/>
						{errors.email && (
							<p className="text-xs text-rust mt-1.5">{errors.email}</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-bold mb-2 text-ink/70">
							متن پیام
						</label>
						<textarea
							value={form.message}
							onChange={handleChange("message")}
							placeholder="پیام خود را بنویسید..."
							rows={5}
							className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors resize-none ${
								errors.message ? "border-rust" : "border-ink/15"
							}`}
						/>
						{errors.message && (
							<p className="text-xs text-rust mt-1.5">{errors.message}</p>
						)}
					</div>

					<button
						type="submit"
						disabled={loading}
						className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-full bg-forest hover:bg-forest-light text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-forest/20"
					>
						{loading ? (
							<Loader2 size={18} className="animate-spin" />
						) : (
							<Send size={18} />
						)}
						{loading ? "در حال ارسال..." : "ارسال پیام"}
					</button>
				</form>
			</div>
		</div>
	);
}
