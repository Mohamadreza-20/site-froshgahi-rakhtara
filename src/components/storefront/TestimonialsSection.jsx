import { useMemo } from "react";
import { useCommentsQuery } from "../../lib/hooks/cms/useCommentsQueries";
import { EmptyState, QueryErrorState, QueryLoadingState } from "../shared/states/QueryStates";
import StarRating from "./StarRating";

export default function TestimonialsSection() {
  const { data: comments = [], isLoading, isError, refetch } = useCommentsQuery();
  const featured = useMemo(
    () => [...comments].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0)).slice(0, 3),
    [comments],
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-extrabold text-forest mb-3">از زبان مشتریان</h2>
      </div>
      {isLoading ? (
        <QueryLoadingState message="در حال بارگذاری نظرات..." />
      ) : isError ? (
        <QueryErrorState message="دریافت نظرات ناموفق بود" onRetry={refetch} />
      ) : featured.length === 0 ? (
        <EmptyState title="هنوز نظری ثبت نشده است" />
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((comment) => (
            <div key={comment.id} className="bg-white rounded-3xl p-8 border border-ink/10">
              <StarRating rating={Number(comment.rating || 0)} />
              <p className="text-ink/70 leading-8 my-6">«{comment.text}»</p>
              <p className="font-bold text-forest">{comment.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
