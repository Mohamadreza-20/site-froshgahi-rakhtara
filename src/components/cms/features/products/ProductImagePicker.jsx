import OptimizedImage from "../../../shared/OptimizedImage";
import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { compressImageToDataUrl } from "../../../../utils/image";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

export default function ProductImagePicker({ value, onChange, error, onError }) {
	const fileInputRef = useRef(null);

	const handlePick = (event) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			onError("لطفاً یک فایل تصویری انتخاب کنید");
			return;
		}
		if (file.size > MAX_IMAGE_SIZE) {
			onError("حجم تصویر باید کمتر از ۳ مگابایت باشد");
			return;
		}
		onError("");
		compressImageToDataUrl(file).then(onChange).catch(() => onError("خطا در پردازش تصویر"));
	};

	return (
		<div>
			<p className="block text-sm font-medium text-[#374151] mb-1.5">تصویر محصول</p>
			<input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handlePick} className="hidden" aria-label="انتخاب تصویر محصول" />
			{value ? (
				<div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#EEF0F5] group">
					<OptimizedImage src={value} alt="پیش‌نمایش تصویر محصول" className="w-full h-full object-cover" />
					<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
						<button type="button" onClick={() => fileInputRef.current?.click()} aria-label="تغییر تصویر محصول" className="cursor-pointer bg-white text-[#111827] text-xs font-medium px-3 py-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30">تغییر تصویر</button>
						<button type="button" onClick={() => onChange("")} aria-label="حذف تصویر محصول" className="cursor-pointer bg-white text-[#DC2626] text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"><X size={13} aria-hidden="true" /> حذف</button>
					</div>
				</div>
			) : (
				<button type="button" onClick={() => fileInputRef.current?.click()} className="cursor-pointer w-full h-40 rounded-xl border-2 border-dashed border-[#EEF0F5] flex flex-col items-center justify-center gap-2 text-[#9CA3AF] hover:border-[#6C63FF] hover:text-[#6C63FF] transition bg-[#FAFAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30">
					<ImagePlus size={26} aria-hidden="true" />
					<span className="text-sm font-medium">برای بارگذاری تصویر کلیک کنید</span>
					<span className="text-xs">PNG، JPG، WebP یا AVIF؛ حداکثر ۳ مگابایت</span>
				</button>
			)}
			{error && <p className="text-xs text-[#DC2626] mt-1.5" role="alert">{error}</p>}
		</div>
	);
}
