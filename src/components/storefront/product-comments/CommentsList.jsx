import StarRating from "../StarRating";

export default function CommentsList({ comments, newCommentId }) {
  return (
    <div className="space-y-5 mb-6">
      {comments.map((comment) => (
        <article key={comment.id} className={`bg-white border rounded-2xl p-5 shadow-sm comment-in ${comment.id === newCommentId ? "border-camel/60 comment-highlight" : "border-ink/10"}`}>
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <span className="font-bold text-forest">{comment.name}</span>
            <div className="flex items-center gap-3">
              <StarRating rating={Number(comment.rating || 0)} />
              {comment.date && <span className="text-xs text-ink/40">{comment.date}</span>}
            </div>
          </div>
          <p className="text-ink/70 leading-7">{comment.text}</p>
        </article>
      ))}
    </div>
  );
}
