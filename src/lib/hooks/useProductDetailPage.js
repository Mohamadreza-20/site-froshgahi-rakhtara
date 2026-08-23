import { useCallback, useMemo } from "react";
import { useProductDetailData } from "./product-detail/useProductDetailData";
import { useProductDetailSelection } from "./product-detail/useProductDetailSelection";
import { useProductDetailFeedback } from "./product-detail/useProductDetailFeedback";

export default function useProductDetailPage({ id, addToCart, cart = [] }) {
  const data = useProductDetailData(id);
  const feedback = useProductDetailFeedback();
  const stock = Math.max(0, Number(data.product?.stock) || 0);
  const cartQtyForProduct = cart.reduce(
    (sum, item) => String(item.id) === String(data.product?.id) ? sum + (Number(item.qty) || 0) : sum,
    0,
  );
  const availableStock = Math.max(0, stock - cartQtyForProduct);
  const selection = useProductDetailSelection(data.product, availableStock);
  const outOfStock = availableStock === 0;
  const productUrl = data.product ? `/product/${data.product.id}` : `/product/${id}`;
  const handleAddToCart = useCallback(async () => {
    if (!data.product || outOfStock || selection.qty > availableStock) return false;
    const added = await addToCart(data.product, selection.qty, selection.size);
    if (added) feedback.flash();
    return Boolean(added);
  }, [addToCart, availableStock, data.product, feedback.flash, outOfStock, selection.qty, selection.size]);
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
    stock: availableStock,
    availableStock,
    rating: data.rating,
    productUrl,
    setQty: selection.setQty,
    setSize: selection.setSize,
    handleAddToCart,
  }), [availableStock, data.product, data.productQuery.isError, data.productQuery.isLoading, data.rating, data.relatedFetching, data.relatedProducts, feedback.justAdded, outOfStock, productUrl, selection.hasSizes, selection.qty, selection.setQty, selection.setSize, selection.size, handleAddToCart, stock]);
}
