const ROLES = ["مشتری", "مدیر فروشگاه", "پشتیبانی"];
const STATUSES = ["فعال", "غیرفعال"];

export default function UserFormFields({ form, onChange }) {
  return (
    <fieldset className="space-y-4 disabled:opacity-60">
      <div>
        <label htmlFor="user-name" className="block text-sm font-medium text-[#374151] mb-1.5">نام و نام خانوادگی</label>
        <input id="user-name" required value={form.name} onChange={onChange("name")} placeholder="مثلاً سارا احمدی" className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white" />
      </div>
      <div>
        <label htmlFor="user-email" className="block text-sm font-medium text-[#374151] mb-1.5">ایمیل</label>
        <input id="user-email" required type="email" dir="ltr" value={form.email} onChange={onChange("email")} placeholder="sara.ahmadi@example.com" className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white text-right" />
      </div>
      <div>
        <label htmlFor="user-phone" className="block text-sm font-medium text-[#374151] mb-1.5">شماره موبایل</label>
        <input id="user-phone" required type="tel" dir="ltr" value={form.phone} onChange={onChange("phone")} placeholder="0912xxxxxxx" className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white text-right" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="user-role" className="block text-sm font-medium text-[#374151] mb-1.5">نقش</label>
          <select id="user-role" value={form.role} onChange={onChange("role")} className="cursor-pointer w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white">
            {ROLES.map((roleOption) => <option key={roleOption} value={roleOption}>{roleOption}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="user-status" className="block text-sm font-medium text-[#374151] mb-1.5">وضعیت</label>
          <select id="user-status" value={form.status} onChange={onChange("status")} className="cursor-pointer w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white">
            {STATUSES.map((statusOption) => <option key={statusOption} value={statusOption}>{statusOption}</option>)}
          </select>
        </div>
      </div>
    </fieldset>
  );
}
