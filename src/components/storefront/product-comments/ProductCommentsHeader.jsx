import { MessageCircle } from "lucide-react";
import StarRating from "../StarRating";

export default function ProductCommentsHeader({ average, count }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
      <h2 className="text-2xl font-extrabold text-forest flex items-center gap-2">
        <MessageCircle size={22} aria-hidden="true" />
        نظرات مشتریان
      </h2>
      {count > 0 ? (
        <div className="flex items-center gap-2">
          <StarRating rating={average} />
          <span className="text-sm text-ink/60">({average.toLocaleString("fa-IR", { maximumFractionDigits: 1 })} از {count.toLocaleString("fa-IR")} نظر)</span>
        </div>
      ) : null}
    </div>
  );
}
