import { Star } from "lucide-react";

export default function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={16} className="text-camel" fill={star <= Math.round(rating) ? "#D4A94E" : "none"} />
      ))}
    </div>
  );
}
