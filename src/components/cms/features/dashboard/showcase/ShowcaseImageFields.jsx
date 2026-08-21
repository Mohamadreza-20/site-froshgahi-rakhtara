import { ImagePlus } from "lucide-react";
import ShowcaseImagePreview from "./ShowcaseImagePreview";

export default function ShowcaseImageFields({ form, setForm, imageError, setImageError, fileInputRef, onPick }) {
  return (
    <>
      <div>
        <label htmlFor="showcase-image-file" className="block text-sm font-medium text-[#374151] mb-1.5">تصویر</label>
        <input id="showcase-image-file" ref={fileInputRef} type="file" accept="image/*" onChange={onPick} className="hidden" />
        {form.src ? (
          <ShowcaseImagePreview
            src={form.src}
            alt={form.alt}
            fileInputRef={fileInputRef}
            onRemove={() => { setForm((previous) => ({ ...previous, src: "" })); setImageError(""); }}
          />
        ) : (
          <button type="button" onClick={() => fileInputRef.current?.click()} className="cursor-pointer w-full h-40 rounded-xl border-2 border-dashed border-[#EEF0F5] flex flex-col items-center justify-center gap-2 text-[#9CA3AF] hover:border-[#6C63FF] hover:text-[#6C63FF] transition bg-[#FAFAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/40">
            <ImagePlus size={26} aria-hidden="true" />
            <span className="text-sm font-medium">برای بارگذاری تصویر کلیک کنید</span>
            <span className="text-xs">PNG یا JPG، حداکثر ۳ مگابایت</span>
          </button>
        )}
        {imageError && <p className="text-xs text-[#DC2626] mt-1.5" role="alert">{imageError}</p>}
      </div>
      <div>
        <label htmlFor="showcase-image-alt" className="block text-sm font-medium text-[#374151] mb-1.5">متن جایگزین (Alt)</label>
        <input id="showcase-image-alt" value={form.alt} onChange={(event) => setForm((previous) => ({ ...previous, alt: event.target.value }))} placeholder="مثلاً کیف چرم دست‌دوز" className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white" />
      </div>
    </>
  );
}
