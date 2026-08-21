import { ChevronDown } from "lucide-react";

export default function CommentsLoadMore({ remaining, pageSize, onLoadMore, showComplete }) {
  if (!remaining && !showComplete) return null;
  if (!remaining) return <div className="text-center mb-12"><span className="text-xs text-ink/40">همه نظرات نمایش داده شد</span></div>;
  return (
    <div className="flex justify-center mb-12">
      <button type="button" onClick={onLoadMore} className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-forest border border-forest/25 bg-forest/5 hover:bg-forest/10 px-5 py-2.5 rounded-full transition-colors">
        نمایش {Math.min(pageSize, remaining).toLocaleString("fa-IR")} نظر دیگر
        <ChevronDown size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
