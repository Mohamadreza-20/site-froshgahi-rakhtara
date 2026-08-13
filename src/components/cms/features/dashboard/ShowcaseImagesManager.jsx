import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
	ImagePlus,
	ImageOff,
	Pencil,
	Trash2,
	ArrowUp,
	ArrowDown,
	X,
} from "lucide-react";
import { Modal, PrimaryButton, ConfirmDialog } from "../../ui";
import {
	getShowcaseImages,
	createShowcaseImage,
	updateShowcaseImage,
	deleteShowcaseImage,
} from "../../../../services/showcase";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const emptyForm = { src: "", alt: "" };

export default function ShowcaseImagesManager() {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingImage, setEditingImage] = useState(null);
	const [form, setForm] = useState(emptyForm);
	const [imageError, setImageError] = useState("");
	const fileInputRef = useRef(null);

	const [deletingImage, setDeletingImage] = useState(null);
	const [savingOrder, setSavingOrder] = useState(false);
	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		async function getData() {
			try {
				const data = await getShowcaseImages();
				setImages(data);
			} catch (error) {
				console.error("خطا در دریافت عکس‌های ویترین:", error);
			} finally {
				setLoading(false);
			}
		}
		getData();
	}, []);

	const openCreateModal = () => {
		setEditingImage(null);
		setForm(emptyForm);
		setImageError("");
		setIsModalOpen(true);
	};

	const openEditModal = (image) => {
		setEditingImage(image);
		setForm({ src: image.src, alt: image.alt ?? "" });
		setImageError("");
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingImage(null);
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
			setForm((prev) => ({ ...prev, src: reader.result }));
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!form.src) {
			setImageError("لطفاً یک تصویر انتخاب کنید");
			return;
		}

		setSaving(true);
		try {
			if (editingImage) {
				const updated = await updateShowcaseImage(editingImage.id, {
					...editingImage,
					src: form.src,
					alt: form.alt,
				});
				setImages((prev) =>
					prev.map((image) => (image.id === editingImage.id ? updated : image)),
				);
				toast.success("عکس ویترین بروزرسانی شد");
			} else {
				const nextOrder =
					images.reduce((max, image) => Math.max(max, image.order ?? 0), 0) + 1;
				const created = await createShowcaseImage({
					src: form.src,
					alt: form.alt,
					order: nextOrder,
				});
				setImages((prev) => [...prev, created]);
				toast.success("عکس ویترین اضافه شد");
			}
			closeModal();
		} catch (error) {
			console.error("ذخیره عکس ویترین با خطا مواجه شد:", error);
			toast.error("ذخیره عکس ویترین با خطا مواجه شد");
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async () => {
		if (!deletingImage) return;
		setDeleting(true);
		try {
			await deleteShowcaseImage(deletingImage.id);
			setImages((prev) => prev.filter((image) => image.id !== deletingImage.id));
			toast.success("عکس ویترین حذف شد");
			setDeletingImage(null);
		} catch (error) {
			console.error("حذف عکس ویترین با خطا مواجه شد:", error);
			toast.error("حذف عکس ویترین با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	const moveImage = async (index, direction) => {
		const targetIndex = index + direction;
		if (targetIndex < 0 || targetIndex >= images.length || savingOrder) return;

		const reordered = [...images];
		[reordered[index], reordered[targetIndex]] = [
			reordered[targetIndex],
			reordered[index],
		];
		setImages(reordered);

		const firstImage = reordered[index];
		const secondImage = reordered[targetIndex];
		setSavingOrder(true);
		try {
			await Promise.all([
				updateShowcaseImage(firstImage.id, { ...firstImage, order: index + 1 }),
				updateShowcaseImage(secondImage.id, { ...secondImage, order: targetIndex + 1 }),
			]);
			setImages((prev) =>
				prev.map((image) => {
					if (image.id === firstImage.id) return { ...image, order: index + 1 };
					if (image.id === secondImage.id) return { ...image, order: targetIndex + 1 };
					return image;
				}),
			);
		} catch (error) {
			console.error("تغییر ترتیب عکس‌ها با خطا مواجه شد:", error);
			toast.error("تغییر ترتیب عکس‌ها با خطا مواجه شد");
		} finally {
			setSavingOrder(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-5">
				<PrimaryButton type="button" onClick={openCreateModal}>
					افزودن عکس
				</PrimaryButton>
				<h3 className="font-bold text-[#111827]">تصاویر ویترین صفحه اصلی</h3>
			</div>

			{loading ? (
				<div className="text-center py-6 text-sm text-[#9CA3AF]">
					در حال بارگذاری...
				</div>
			) : images.length === 0 ? (
				<div className="text-center py-6 text-sm text-[#9CA3AF]">
					هنوز عکسی اضافه نشده است
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{images.map((image, index) => (
						<div
							key={image.id}
							className="border border-[#EEF0F5] rounded-xl overflow-hidden group"
						>
							<div className="relative w-full h-32 bg-[#F5F6FA]">
								{image.src ? (
									<img
										src={image.src}
										alt={image.alt}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center">
										<ImageOff size={18} className="text-[#9CA3AF]" />
									</div>
								)}
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
									<button
										type="button"
										onClick={() => openEditModal(image)}
										className="cursor-pointer bg-white text-[#111827] p-2 rounded-lg"
										aria-label="ویرایش عکس"
									>
										<Pencil size={14} />
									</button>
									<button
										type="button"
										onClick={() => setDeletingImage(image)}
										className="cursor-pointer bg-white text-[#DC2626] p-2 rounded-lg"
										aria-label="حذف عکس"
									>
										<Trash2 size={14} />
									</button>
								</div>
							</div>
							<div className="flex items-center justify-between px-3 py-2.5">
								<div className="flex items-center gap-1">
									<button
										type="button"
										disabled={index === 0 || savingOrder}
										onClick={() => moveImage(index, -1)}
										className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[#6B7280] hover:text-[#111827] p-1"
										aria-label="انتقال به عقب"
										title="انتقال به عقب"
									>
										<ArrowUp size={14} />
									</button>
									<button
										type="button"
										disabled={index === images.length - 1 || savingOrder}
										onClick={() => moveImage(index, 1)}
										className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[#6B7280] hover:text-[#111827] p-1"
										aria-label="انتقال به جلو"
										title="انتقال به جلو"
									>
										<ArrowDown size={14} />
									</button>
								</div>
								<div className="text-xs text-[#6B7280] truncate max-w-[70%]" title={image.alt}>
									{image.alt || "بدون عنوان"}
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			<Modal
				open={isModalOpen}
				onClose={() => {
					if (saving) return;
					closeModal();
				}}
				title={editingImage ? "ویرایش عکس ویترین" : "افزودن عکس ویترین"}
				footer={
					<>
						<button
							type="button"
							onClick={closeModal}
							disabled={saving}
							className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							انصراف
						</button>
						<PrimaryButton type="submit" form="showcase-image-form" loading={saving}>
							{saving ? "در حال ذخیره..." : editingImage ? "ذخیره تغییرات" : "ذخیره عکس"}
						</PrimaryButton>
					</>
				}
			>
				<form
					id="showcase-image-form"
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<fieldset disabled={saving} className="space-y-4 disabled:opacity-60">
						<div>
						<label className="block text-sm font-medium text-[#374151] mb-1.5">
							تصویر
						</label>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={handleImagePick}
							className="hidden"
						/>
						{form.src ? (
							<div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#EEF0F5] group">
								<img
									src={form.src}
									alt="پیش‌نمایش"
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
										onClick={() => setForm((prev) => ({ ...prev, src: "" }))}
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
							متن جایگزین (Alt)
						</label>
						<input
							value={form.alt}
							onChange={(event) =>
								setForm((prev) => ({ ...prev, alt: event.target.value }))
							}
							placeholder="مثلاً کیف چرم دست‌دوز"
							className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
						/>
					</div>
					</fieldset>
				</form>
			</Modal>

			<ConfirmDialog
				open={Boolean(deletingImage)}
				onClose={() => setDeletingImage(null)}
				onConfirm={handleDelete}
				loading={deleting}
				title="حذف عکس ویترین"
				description="آیا از حذف این عکس از ویترین صفحه اصلی مطمئن هستید؟"
			/>
		</div>
	);
}
