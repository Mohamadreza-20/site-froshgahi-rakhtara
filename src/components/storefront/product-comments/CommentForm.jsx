import { Loader2, Star } from "lucide-react";

export default function CommentForm({ name, text, rating, hoverRating, pending, onNameChange, onTextChange, onRatingChange, onHoverChange, onSubmit }) {
  return (
    <div className="bg-camel/10 border border-camel/20 rounded-2xl p-6">
      <h3 className="font-bold text-forest mb-4">ثبت نظر جدید</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <fieldset disabled={pending} className="space-y-4 disabled:opacity-60">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="sr-only" htmlFor="comment-name">نام شما</label>
              <input id="comment-name" type="text" value={name} onChange={onNameChange} placeholder="نام شما" required className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest" />
            </div>
            <div className="flex items-center gap-1" aria-label="امتیاز به محصول">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => onRatingChange(star)}
                  onMouseEnter={() => onHoverChange(star)}
                  onMouseLeave={() => onHoverChange(0)}
                  aria-label={`امتیاز ${star}`}
                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel rounded"
                >
                  <Star size={22} className="text-camel" fill={star <= (hoverRating || rating) ? "#D4A94E" : "none"} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <label className="sr-only" htmlFor="comment-text">نظر شما</label>
          <textarea id="comment-text" value={text} onChange={onTextChange} placeholder="نظر خود را درباره این محصول بنویسید..." required rows={3} className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest resize-none" />
          <button type="submit" disabled={pending} className="cursor-pointer flex items-center gap-2 bg-forest text-cream font-bold px-6 py-2.5 rounded-full hover:bg-forest-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30">
            {pending && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
            {pending ? "در حال ارسال..." : "ثبت نظر"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
