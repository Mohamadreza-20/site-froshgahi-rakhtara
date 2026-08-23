import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { deleteCartItem, getCartItems, mergeCartItems, updateCartItem } from "../../../services/cart";
import { getProducts } from "../../../services/products";
import { createMutationQueue } from "../../cart/mutationQueue";
import { fromCartRow } from "../../cart/cart.utils";

export function useCartData({ userId, guestId }) {
  const ownerId = userId || guestId;
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartRef = useRef([]);
  const queueRef = useRef(null);
  const previousUserId = useRef(userId ?? null);

  if (!queueRef.current) queueRef.current = createMutationQueue();

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  const loadCart = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const rows = await getCartItems(id);
      const productResult = await getProducts().catch(() => ({ items: [] }));
      const stockByProductId = new Map(productResult.items.map((product) => [String(product.id), Math.max(0, Number(product.stock) || 0)]));
      const normalizedRows = rows
        .map((row) => {
          const stock = stockByProductId.has(String(row.productId))
            ? stockByProductId.get(String(row.productId))
            : Math.max(0, Number(row.stock) || 0);
          const qty = Math.max(0, Number(row.qty) || 0);
          return { row, stock, qty: Math.min(qty, stock) };
        })
        .filter(({ qty }) => qty > 0);

      await Promise.all(rows.map(async (row) => {
        const normalized = normalizedRows.find((entry) => entry.row.id === row.id);
        const nextQty = normalized?.qty ?? 0;
        const nextStock = normalized?.stock ?? 0;
        if (nextQty <= 0) {
          await deleteCartItem(row.id);
          return;
        }
        if (Number(row.qty) !== nextQty || Number(row.stock) !== nextStock) {
          await updateCartItem(row.id, { qty: nextQty, stock: nextStock });
        }
      }));

      const nextCart = normalizedRows.map(({ row, stock, qty }) => fromCartRow({ ...row, qty, stock }));
      cartRef.current = nextCart;
      setCart(nextCart);
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCart(ownerId);
  }, [loadCart, ownerId]);

  useEffect(() => {
    const previousId = previousUserId.current;
    const currentId = userId ?? null;
    previousUserId.current = currentId;

    if (!currentId || previousId || currentId === guestId) return;

    void queueRef.current(async () => {
      await mergeCartItems(guestId, currentId);
      await loadCart(currentId);
    }).catch(() => {
      setError(new Error("انتقال سبد خرید مهمان با خطا مواجه شد"));
      toast.error("انتقال سبد خرید مهمان با خطا مواجه شد");
    });
  }, [guestId, loadCart, userId]);

  const refetch = useCallback(() => loadCart(ownerId), [loadCart, ownerId]);

  return {
    cart,
    setCart,
    cartRef,
    enqueueMutation: queueRef.current,
    ownerId,
    loading,
    error,
    refetch,
  };
}
