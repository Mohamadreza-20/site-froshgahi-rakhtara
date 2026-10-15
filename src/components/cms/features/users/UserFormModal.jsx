import { useEffect, useState } from "react";
import { Modal, PrimaryButton } from "../../ui";
import { toJalaliToday } from "../../../../utils/date";

const ROLES = ["مشتری", "مدیر فروشگاه", "پشتیبانی"];
const STATUSES = ["فعال", "غیرفعال"];

const emptyForm = {
	name: "",
	email: "",
	phone: "",
	role: ROLES[0],
	status: STATUSES[0],
};

export default function UserFormModal({
	open,
	onClose,
	onSubmit,
	user,
	submitting = false,
}) {
	const isEditMode = Boolean(user);
	const [form, setForm] = useState(emptyForm);

	useEffect(() => {
		if (open) {
			setForm(
				user
					? {
							name: user.name ?? "",
							email: user.email ?? "",
							phone: user.phone ?? "",
							role: user.role ?? ROLES[0],
							status: user.status ?? STATUSES[0],
						}
					: emptyForm,
			);
		}
	}, [open, user]);

	const handleChange = (field) => (event) =>
		setForm((prev) => ({ ...prev, [field]: event.target.value }));

	const handleClose = () => {
		if (submitting) return;
		onClose?.();
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (isEditMode) {
			onSubmit?.({ ...form });
			return;
		}

		const seed = `${form.name.trim() || "user"}-${Date.now()}`;
		onSubmit?.({
			...form,
			joined: toJalaliToday(),
			seed,
		});
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید"}
			footer={
				<>
					<button
						type="button"
						onClick={handleClose}
						disabled={submitting}
						className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						انصراف
					</button>
					<PrimaryButton type="submit" form="user-form" loading={submitting}>
						{submitting
							? "در حال ذخیره..."
							: isEditMode
								? "ذخیره تغییرات"
								: "ذخیره کاربر"}
					</PrimaryButton>
				</>
			}
		>
			<form id="user-form" onSubmit={handleSubmit} className="space-y-4">
				<fieldset disabled={submitting} className="space-y-4 disabled:opacity-60">
				<div>
					<label className="block text-sm font-medium text-[#374151] mb-1.5">
						نام و نام خانوادگی
					</label>
					<input
						required
						value={form.name}
						onChange={handleChange("name")}
						placeholder="مثلاً سارا احمدی"
						className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-[#374151] mb-1.5">
						ایمیل
					</label>
					<input
						required
						type="email"
						dir="ltr"
						value={form.email}
						onChange={handleChange("email")}
						placeholder="sara.ahmadi@example.com"
						className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white text-right"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-[#374151] mb-1.5">
						شماره موبایل
					</label>
					<input
						required
						type="tel"
						dir="ltr"
						value={form.phone}
						onChange={handleChange("phone")}
						placeholder="0912xxxxxxx"
						className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white text-right"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-[#374151] mb-1.5">
							نقش
						</label>
						<select
							value={form.role}
							onChange={handleChange("role")}
							className="cursor-pointer w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
						>
							{ROLES.map((roleOption) => (
								<option key={roleOption} value={roleOption}>
									{roleOption}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-[#374151] mb-1.5">
							وضعیت
						</label>
						<select
							value={form.status}
							onChange={handleChange("status")}
							className="cursor-pointer w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
						>
							{STATUSES.map((statusOption) => (
								<option key={statusOption} value={statusOption}>
									{statusOption}
								</option>
							))}
						</select>
					</div>
				</div>
				</fieldset>
			</form>
		</Modal>
	);
}
