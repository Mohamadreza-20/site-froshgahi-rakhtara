import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function StockPill({ stock }) {
  if (stock === 0)
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FDECEC] text-[#DC2626]">
        <XCircle size={12} /> ناموجود
      </span>
    );
  if (stock <= 6)
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FEF6E7] text-[#B45309]">
        <AlertCircle size={12} /> {stock} عدد
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E9F7EF] text-[#16A34A]">
      <CheckCircle2 size={12} /> {stock} عدد
    </span>
  );
}
