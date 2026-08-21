import { useMemo } from "react";
export function useCommentsStats(comments) {
  return useMemo(() => {
    if (!comments.length) return { avgRating: 0, fiveStarCount: 0, lowRatingCount: 0 };
    const total = comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0);
    return { avgRating: total / comments.length, fiveStarCount: comments.filter((comment) => Number(comment.rating || 0) === 5).length, lowRatingCount: comments.filter((comment) => Number(comment.rating || 0) <= 2).length };
  }, [comments]);
}
