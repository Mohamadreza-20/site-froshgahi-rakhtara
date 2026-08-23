const CATEGORY_STYLES = {
  "پوشاک زنانه": { bg: "bg-[#FDF2FA]", text: "text-[#C026D3]" },
  "پوشاک مردانه": { bg: "bg-[#EEF2FF]", text: "text-[#4F46E5]" },
  "کیف و کفش": { bg: "bg-[#FFF7ED]", text: "text-[#EA580C]" },
  "اکسسوری": { bg: "bg-[#FFFBEB]", text: "text-[#B45309]" },
};

export default function CategoryBadge({ category }) {
  const style = CATEGORY_STYLES[category] || { bg: "bg-[#F5F6FA]", text: "text-[#374151]" };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${style.bg} ${style.text}`}>{category || "بدون دسته"}</span>;
}
