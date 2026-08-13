const map = {
  "فعال": "bg-[#E9F7EF] text-[#16A34A]",
  "غیرفعال": "bg-[#FDECEC] text-[#DC2626]",
  "پاسخ داده شده": "bg-[#E9F7EF] text-[#16A34A]",
  "در انتظار پاسخ": "bg-[#FEF6E7] text-[#D97706]",
};

export default function StatusPill({ status }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
