import OptimizedImage from "../../../../shared/OptimizedImage";
import { ArrowDown, ArrowUp, ImageOff, Pencil, Trash2 } from "lucide-react";

export default function ShowcaseImageGrid({ images, savingOrder, onEdit, onDelete, onMove }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <article key={image.id} className="border border-[#EEF0F5] rounded-xl overflow-hidden bg-white">
          <div className="relative w-full h-36 bg-[#F5F6FA]">
            {image.src ? (
              <OptimizedImage
                src={image.src}
                alt={image.alt || "تصویر ویترین"}
                className="w-full h-full object-cover"
                width={640}
                height={360}
                responsive={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageOff size={22} className="text-[#9CA3AF]" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="px-3 py-3 space-y-3">
            <div className="min-w-0 text-right">
              <p className="text-sm font-semibold text-[#111827] truncate">
                {image.title || image.alt || "بدون عنوان"}
              </p>
              <p className="text-xs text-[#9CA3AF] truncate mt-1" dir="ltr" title={image.src}>
                {image.src || "بدون آدرس تصویر"}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0 || savingOrder}
                  onClick={() => onMove(index, -1)}
                  className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[#6B7280] hover:text-[#111827] p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"
                  aria-label="انتقال اسلاید به بالا"
                >
                  <ArrowUp size={15} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  disabled={index === images.length - 1 || savingOrder}
                  onClick={() => onMove(index, 1)}
                  className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-[#6B7280] hover:text-[#111827] p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"
                  aria-label="انتقال اسلاید به پایین"
                >
                  <ArrowDown size={15} aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(image)}
                  className="cursor-pointer text-[#374151] hover:bg-[#F5F6FA] p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/40"
                  aria-label={`ویرایش ${image.title || image.alt || "اسلاید"}`}
                >
                  <Pencil size={15} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(image)}
                  className="cursor-pointer text-[#DC2626] hover:bg-[#FEF2F2] p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/40"
                  aria-label={`حذف ${image.title || image.alt || "اسلاید"}`}
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
