import OptimizedImage from "../../../../shared/OptimizedImage";
import { X } from "lucide-react";

export default function ShowcaseImagePreview({ src, alt, onRemove, fileInputRef }) {
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#EEF0F5] group">
      <OptimizedImage src={src} alt={alt || "پیش‌نمایش تصویر"} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 group-focus-within:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
        <button type="button" onClick={() => fileInputRef.current?.click()} className="cursor-pointer bg-white text-[#111827] text-xs font-medium px-3 py-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/40">تغییر تصویر</button>
        <button type="button" onClick={onRemove} className="cursor-pointer bg-white text-[#DC2626] text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/40"><X size={13} aria-hidden="true" /> حذف</button>
      </div>
    </div>
  );
}
