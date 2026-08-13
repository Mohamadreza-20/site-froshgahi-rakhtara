import { LayoutGrid, List } from "lucide-react";

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-[#F5F6FA] rounded-xl p-1">
      <button
        onClick={() => onChange("grid")}
        aria-label="نمایش جعبه‌ای"
        className={`cursor-pointer flex items-center justify-center w-9 h-9 rounded-lg transition ${
          view === "grid" ? "bg-white text-[#111827] shadow-sm" : "text-[#9CA3AF] hover:text-[#111827]"
        }`}
      >
        <LayoutGrid size={16} />
      </button>
      <button
        onClick={() => onChange("table")}
        aria-label="نمایش جدولی"
        className={`cursor-pointer flex items-center justify-center w-9 h-9 rounded-lg transition ${
          view === "table" ? "bg-white text-[#111827] shadow-sm" : "text-[#9CA3AF] hover:text-[#111827]"
        }`}
      >
        <List size={16} />
      </button>
    </div>
  );
}
