import { useCallback, useMemo } from "react";
import { useProductDetailData } from "./product-detail/useProductDetailData";
import { useProductDetailSelection } from "./product-detail/useProductDetailSelection";
import { useProductDetailFeedback } from "./product-detail/useProductDetailFeedback";

export default function useProductDetailPage({ id, addToCart }) {
  const data = useProductDetailData(id);
  const selection = useProductDetailSelection(data.product);
  const feedback = useProductDetailFeedback();
  const outOfStock = Number(data.product?.stock) === 0;
  const productUrl = data.product ? `/product/${data.product.id}` : `/product/${id}`;
  const handleAddToCart = useCallback(() => {
    if (!data.product || outOfStock) return;
    addToCart(data.product, selection.qty, selection.size);
    feedback.flash();
  }, [addToCart, data.product, feedback.flash, outOfStock, selection.qty, selection.size]);
  return useMemo(() => ({
    product: data.product,
    relatedProducts: data.relatedProducts,
    relatedFetching: data.relatedFetching,
    loading: data.productQuery.isLoading,
    productError: data.productQuery.isError,
    qty: selection.qty,
    size: selection.size,
    justAdded: feedback.justAdded,
    hasSizes: selection.hasSizes,
    outOfStock,
    rating: data.rating,
    productUrl,
    setQty: selection.setQty,
    setSize: selection.setSize,
    handleAddToCart,
  }), [data.product, data.productQuery.isError, data.productQuery.isLoading, data.rating, data.relatedFetching, data.relatedProducts, feedback.justAdded, outOfStock, productUrl, selection.hasSizes, selection.qty, selection.setQty, selection.setSize, selection.size, handleAddToCart]);
}
