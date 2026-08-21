import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getCartItems, mergeCartItems } from "../../../services/cart";
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
      const nextCart = rows.map(fromCartRow);
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
