import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import {
	ChevronLeft,
	Loader2,
	Save,
	KeyRound,
	Mail,
	Phone,
	CalendarDays,
} from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { canAccessPanel } from "../lib/roles";
import { getAvatarUrl } from "../utils/avatar";
import {
	updateProfileSchema,
	changePasswordSchema,
	getZodErrors,
} from "../utils/validators";
import { updateProfile, changePassword } from "../services/authService";
import MyMessagesSection from "../components/cms/features/account/MyMessagesSection";

const inputClass = (hasError) =>
	`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-camel transition-colors text-right ${
		hasError ? "border-rust" : "border-ink/15"
	}`;

function ProfileForm({ user, onSaved }) {
	const [form, setForm] = useState({
		fullName: user.name || "",
		email: user.email || "",
		phone: user.phone || "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleChange = (field) => (event) => {
		setForm((prev) => ({ ...prev, [field]: event.target.value }));
		if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	async function handleSubmit(event) {
		event.preventDefault();

		const nextErrors = getZodErrors(updateProfileSchema, form);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		setLoading(true);
		const result = await updateProfile(user.id, form);
		setLoading(false);

		if (result.success) {
			onSaved(result.data);
			toast.success("اطلاعات شما با موفقیت بروزرسانی شد");
		} else {
			toast.error(result.error || "بروزرسانی اطلاعات ناموفق بود");
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5"
		>
			<h2 className="font-extrabold text-lg text-forest mb-1">
				ویرایش اطلاعات
			</h2>
			<p className="text-sm text-ink/50 mb-4">
				اطلاعات حساب کاربری خود را در صورت نیاز تغییر دهید.
			</p>

			<div>
				<label className="block text-sm font-bold mb-2 text-ink/70">
					نام و نام خانوادگی
				</label>
				<input
					type="text"
					value={form.fullName}
					onChange={handleChange("fullName")}
					placeholder="نام شما"
					className={inputClass(errors.fullName)}
				/>
				{errors.fullName && (
					<p className="text-xs text-rust mt-1.5">{errors.fullName}</p>
				)}
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
					className={inputClass(errors.email)}
				/>
				{errors.email && (
					<p className="text-xs text-rust mt-1.5">{errors.email}</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-bold mb-2 text-ink/70">
					شماره موبایل
				</label>
				<input
					type="tel"
					dir="ltr"
					value={form.phone}
					onChange={handleChange("phone")}
					placeholder="0912xxxxxxx"
					className={inputClass(errors.phone)}
				/>
				{errors.phone && (
					<p className="text-xs text-rust mt-1.5">{errors.phone}</p>
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
					<Save size={18} />
				)}
				{loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
			</button>
		</form>
	);
}

function PasswordForm({ user }) {
	const emptyForm = {
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	};
	const [form, setForm] = useState(emptyForm);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleChange = (field) => (event) => {
		setForm((prev) => ({ ...prev, [field]: event.target.value }));
		if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	async function handleSubmit(event) {
		event.preventDefault();

		const nextErrors = getZodErrors(changePasswordSchema, form);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		setLoading(true);
		const result = await changePassword(user.id, form);
		setLoading(false);

		if (result.success) {
			toast.success("رمز عبور با موفقیت تغییر کرد");
			setForm(emptyForm);
		} else {
			toast.error(result.error || "تغییر رمز عبور ناموفق بود");
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="bg-white border border-ink/10 rounded-3xl p-6 md:p-8 space-y-5"
		>
			<h2 className="font-extrabold text-lg text-forest mb-1 flex items-center gap-2">
				<KeyRound size={18} />
				تغییر رمز عبور
			</h2>
			<p className="text-sm text-ink/50 mb-4">
				برای تغییر رمز عبور، ابتدا رمز فعلی خود را وارد کنید.
			</p>

			<div>
				<label className="block text-sm font-bold mb-2 text-ink/70">
					رمز عبور فعلی
				</label>
				<input
					type="password"
					value={form.currentPassword}
					onChange={handleChange("currentPassword")}
					placeholder="رمز عبور فعلی"
					className={inputClass(errors.currentPassword)}
				/>
				{errors.currentPassword && (
					<p className="text-xs text-rust mt-1.5">{errors.currentPassword}</p>
				)}
			</div>

			<div className="grid sm:grid-cols-2 gap-5">
				<div>
					<label className="block text-sm font-bold mb-2 text-ink/70">
						رمز عبور جدید
					</label>
					<input
						type="password"
						value={form.newPassword}
						onChange={handleChange("newPassword")}
						placeholder="حداقل ۸ کاراکتر"
						className={inputClass(errors.newPassword)}
					/>
					{errors.newPassword && (
						<p className="text-xs text-rust mt-1.5">{errors.newPassword}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-bold mb-2 text-ink/70">
						تکرار رمز عبور جدید
					</label>
					<input
						type="password"
						value={form.confirmNewPassword}
						onChange={handleChange("confirmNewPassword")}
						placeholder="تکرار رمز عبور جدید"
						className={inputClass(errors.confirmNewPassword)}
					/>
					{errors.confirmNewPassword && (
						<p className="text-xs text-rust mt-1.5">
							{errors.confirmNewPassword}
						</p>
					)}
				</div>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 font-bold px-8 py-3.5 rounded-full bg-ink/90 hover:bg-ink text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
			>
				{loading ? (
					<Loader2 size={18} className="animate-spin" />
				) : (
					<KeyRound size={18} />
				)}
				{loading ? "در حال تغییر..." : "تغییر رمز عبور"}
			</button>
		</form>
	);
}

export default function AccountPage() {
	const { user, isAuthenticated, updateUser } = useAuthContext();

	if (!isAuthenticated) {
		return <Navigate to="/auth" state={{ tab: "login" }} replace />;
	}

	if (canAccessPanel(user)) {
		return <Navigate to="/dashboard/home" replace />;
	}

	return (
		<div className="max-w-5xl mx-auto px-6 py-10">
			<div className="flex items-center gap-2 text-sm mb-8 text-ink/50">
				<Link to="/" className="hover:underline text-forest">
					خانه
				</Link>
				<ChevronLeft size={14} />
				<span>پنل کاربری</span>
			</div>

			<div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-5 bg-white border border-ink/10 rounded-3xl p-6 md:p-8">
				<img
					src={getAvatarUrl(user.seed || user.name || user.email)}
					alt={user.name}
					className="w-20 h-20 rounded-full shadow-md shadow-forest/10"
				/>
				<div className="flex-1">
					<h1 className="text-2xl font-extrabold text-forest">{user.name}</h1>
					<div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink/60">
						<span className="flex items-center gap-1.5" dir="ltr">
							<Mail size={14} />
							{user.email}
						</span>
						<span className="flex items-center gap-1.5" dir="ltr">
							<Phone size={14} />
							{user.phone}
						</span>
						{user.joined && (
							<span className="flex items-center gap-1.5">
								<CalendarDays size={14} />
								عضویت از {user.joined}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<ProfileForm user={user} onSaved={updateUser} />
				<PasswordForm user={user} />
			</div>

			<MyMessagesSection userId={user.id} />
		</div>
	);
}
