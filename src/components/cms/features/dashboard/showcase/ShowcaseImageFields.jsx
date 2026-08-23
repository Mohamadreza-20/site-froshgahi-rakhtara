export default function ShowcaseImageFields({ form, setForm, imageError, setImageError }) {
  return (
    <>
      <div>
        <label htmlFor="showcase-image-src" className="block text-sm font-medium text-[#374151] mb-1.5">
          آدرس تصویر
        </label>
        <input
          id="showcase-image-src"
          type="text"
          value={form.src}
          onChange={(event) => {
            setForm((previous) => ({ ...previous, src: event.target.value }));
            if (imageError) setImageError("");
          }}
          placeholder="/images/showcase-fashion.svg یا https://..."
          autoComplete="off"
          dir="ltr"
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
        />
        <p className="text-xs text-[#9CA3AF] mt-1.5 leading-5">
          JSON Server فایل واقعی آپلود نمی‌کند؛ مسیر یک تصویر موجود در public یا یک URL معتبر را وارد کنید.
        </p>
        {imageError ? (
          <p className="text-xs text-[#DC2626] mt-1.5" role="alert">
            {imageError}
          </p>
        ) : null}
      </div>

      {form.src ? (
        <div className="rounded-xl overflow-hidden border border-[#EEF0F5] bg-[#FAFAFC]">
          <img
            src={form.src}
            alt={form.alt || "پیش‌نمایش اسلاید"}
            className="w-full h-40 object-cover"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              setImageError("تصویر با این آدرس قابل نمایش نیست");
            }}
          />
        </div>
      ) : null}

      <div>
        <label htmlFor="showcase-image-title" className="block text-sm font-medium text-[#374151] mb-1.5">
          عنوان اسلاید
        </label>
        <input
          id="showcase-image-title"
          value={form.title}
          onChange={(event) => setForm((previous) => ({ ...previous, title: event.target.value }))}
          placeholder="مثلاً استایل مینیمال"
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
        />
      </div>

      <div>
        <label htmlFor="showcase-image-alt" className="block text-sm font-medium text-[#374151] mb-1.5">
          متن جایگزین (Alt)
        </label>
        <input
          id="showcase-image-alt"
          value={form.alt}
          onChange={(event) => setForm((previous) => ({ ...previous, alt: event.target.value }))}
          placeholder="مثلاً کیف چرم رخت‌آرا"
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white"
        />
      </div>
    </>
  );
}
