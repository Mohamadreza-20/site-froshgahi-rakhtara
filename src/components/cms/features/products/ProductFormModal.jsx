import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Modal, PrimaryButton } from "../../ui";
import { CATEGORIES } from "../../../../lib/data/products";

const emptyForm = {
	name: "",
	cat: CATEGORIES[0].name,
	price: "",
	stock: "",
	sku: "",
	desc: "",
	sizes: "",
	image: "",
	longDesc: "",
};

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

export default function ProductFormModal({
	open,
	onClose,
	onSubmit,
	product,
	submitting = false,
}) {
	const isEditMode = Boolean(product);
	const [form, setForm] = useState(emptyForm);
	const [imageError, setImageError] = useState("");
	const fileInputRef = useRef(null);

	useEffect(() => {
		if (open) {
			setImageError("");
			setForm(
				product
					? {
							name: product.name ?? "",
							cat: product.cat ?? CATEGORIES[0].name,
							price: product.price ?? "",
							stock: product.stock ?? "",
							sku: product.sku ?? "",
							desc: product.desc ?? "",
							sizes: Array.isArray(product.sizes)
								? product.sizes.join("، ")
								: "",
							image: product.image ?? "",
							longDesc: product.longDesc ?? "",
						}
					: emptyForm,
			);
		}
	}, [open, product]);

	const handleChange = (field) => (event) =>
		setForm((prev) => ({ ...prev, [field]: event.target.value }));

	const handleClose = () => {
		if (submitting) return;
		onClose?.();
	};

	const handleImagePick = (event) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			setImageError("لطفاً یک فایل تصویری انتخاب کنید");
			return;
		}
		if (file.size > MAX_IMAGE_SIZE) {
			setImageError("حجم تصویر باید کمتر از ۳ مگابایت باشد");
			return;
		}

		setImageError("");
		const reader = new FileReader();
		reader.onload = () => {
			setForm((prev) => ({ ...prev, image: reader.result }));
		};
		reader.readAsDataURL(file);
	};

	const handleRemoveImage = () => {
		setForm((prev) => ({ ...prev, image: "" }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const sizes = form.sizes
			.split(/[،,]/)
			.map((size) => size.trim())
			.filter(Boolean);

		onSubmit?.({
			...form,
			price: Number(form.price) || 0,
			stock: Number(form.stock) || 0,
			sizes,
		});
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={isEditMode ? "ویرایش محصول" : "افزودن محصول جدید"}
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
					<PrimaryButton type="submit" form="product-form" loading={submitting}>
						{submitting
							? "در حال ذخیره..."
							: isEditMode
								? "ذخیره تغییرات"
								: "ذخیره محصول"}
					</PrimaryButton>
				</>
			}
		>
			<form id="product-form" onSubmit={handleSubmit} className="space-y-4">
				<fieldset disabled={submitting} className="space-y-4 disabled:opacity-60">
				<div>
					<label className="block text-sm font-medium text-[#374151] mb-1.5">
						تصویر محصول
					</label>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleImagePick}
						className="hidden"
					/>
					{form.image ? (
						<div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#EEF0F5] group">
							<img
								src={form.image}
								alt="پیش‌نمایش محصول"
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="cursor-pointer bg-white text-[#111827] text-xs font-medium px-3 py-1.5 rounded-lg"
								>
									تغییر تصویر
								</button>
								<button
									type="button"
									onClick={handleRemoveImage}
									className="cursor-pointer bg-white text-[#DC2626] text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1"
								>
									<X size={13} /> حذف
								</button>
							</div>
						</div>
					) : (
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="cursor-pointer w-full h-40 rounded-xl border-2 border-dashed border-[#EEF0F5] flex flex-col items-center justify-center gap-2 text-[#9CA3AF] hover:border-[#6C63FF] hover:text-[#6C63FF] transition bg-[#FAFAFC]"
						>
							<ImagePlus size={26} />
							<span className="text-sm font-medium">
								برای بارگذاری تصویر کلیک کنید
							</span>
							<span className="text-xs">PNG یا JPG، حداکثر ۳ مگابایت</span>
						</button>
					)}
					{imageError && (
						<p className="text-xs text-[#DC2626] mt-1.5">{imageError}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-[#374151] mb-1.5">
						نام محصول
					</label>
					<input
						required
						value={form.name}
						onChange={handleChange("name")}
						placeholder="مثلاً کفش اسپرت مدل آریا"
						className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-[#374151] mb-1.5">
							دسته‌بندی
						</label>
						<select
							value={form.cat}
							onChange={handleChange("cat")}
							className="cursor-pointer w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
						>
							{CATEGORIES.map((category) => (
								<option key={category.id} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-[#374151] mb-1.5">
							کد محصول (SKU)
						</label>
						<input
							required
							value={form.sku}
							onChange={handleChange("sku")}
							placeholder="SH-1042"
							className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-[#374151] mb-1.5">
							قیمت (تومان)
						</label>
						<input
							required
							type="number"
							min="0"
							value={form.price}
							onChange={handleChange("price")}
							placeholder="1250000"
							className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-[#374151] mb-1.5">
							موجودی انبار
						</label>
						<input
							required
							type="number"
							min="0"
							value={form.stock}
							onChange={handleChange("stock")}
							placeholder="۲۴"
							className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-[#374151] mb-1.5">
						سایزها (اختیاری، با ویرگول جدا کنید)
					</label>
					<input
						value={form.sizes}
						onChange={handleChange("sizes")}
						placeholder="S، M، L، XL"
						className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-[#374151] mb-1.5">
						توضیح کوتاه
					</label>
					<textarea
						value={form.desc}
						onChange={handleChange("desc")}
						rows={3}
						placeholder="توضیح کوتاهی درباره محصول بنویسید"
						className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white resize-none"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-[#374151] mb-1.5">
						توضیح کامل
					</label>
					<textarea
						value={form.longDesc}
						onChange={handleChange("longDesc")}
						rows={8}
						placeholder="توضیح کامل درباره محصول بنویسید"
						className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white resize-none"
					/>
				</div>
				</fieldset>
			</form>
		</Modal>
	);
}
