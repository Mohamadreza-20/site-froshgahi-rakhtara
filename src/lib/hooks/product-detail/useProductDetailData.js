import { useMemo } from "react";
import { useCommentsQuery } from "../cms/useCommentsQueries";
import { useProduct, useProducts } from "../useProducts";

export function useProductDetailData(id) {
  const productQuery = useProduct(id);
  const { data: product } = productQuery;
  const relatedQuery = useProducts({ category: product?.cat, limit: 4, enabled: Boolean(product) });
  const commentsQuery = useCommentsQuery({ enabled: Boolean(product) });
  const rating = useMemo(() => {
    const comments = (commentsQuery.data || []).filter((comment) => String(comment.productId) === String(id));
    if (!comments.length) return { average: 0, count: 0 };
    return { average: comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0) / comments.length, count: comments.length };
  }, [commentsQuery.data, id]);
  return { product, productQuery, relatedProducts: relatedQuery.products, relatedFetching: relatedQuery.fetching, rating };
}
