export default function CommentsSearch({ value, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02]">
      <label className="sr-only" htmlFor="comments-search">جستجو در نظرات</label>
      <input
        id="comments-search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="جستجو در نام، متن نظر یا نام محصول..."
        className="w-full sm:w-80 rounded-xl border border-[#EEF0F5] px-4 py-2.5 text-sm outline-none focus:border-[#16A34A]"
      />
    </div>
  );
}
