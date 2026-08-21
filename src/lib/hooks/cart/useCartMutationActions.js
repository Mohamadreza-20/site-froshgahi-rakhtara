import { useCallback } from "react";
import { toast } from "sonner";
import { createCartItem, deleteCartItem, updateCartItem } from "../../../services/cart";
import { fromCartRow, getCartKey, toCartPayload } from "../../cart/cart.utils";

function setCartAndRef(setCart, cartRef, updater) {
  setCart((previous) => {
    const next = typeof updater === "function" ? updater(previous) : updater;
    cartRef.current = next;
    return next;
  });
}

function restoreOnlyIfCurrentMatches(setCart, cartRef, cartKey, optimisticValue, rollback) {
  setCartAndRef(setCart, cartRef, (current) => {
    if (typeof optimisticValue === "function" ? optimisticValue(current) : current.some((item) => item.cartKey === cartKey && item.qty === optimisticValue)) {
      return rollback(current);
    }
    return current;
  });
}

export function useCartMutationActions({ cartRef, setCart, enqueueMutation, ownerId, flashBump, refetch }) {
  const addToCart = useCallback(async (product, qty = 1, size = null) => {
    if (!product || qty <= 0) return;
    const cartKey = getCartKey(product.id, size);
    const existing = cartRef.current.find((item) => item.cartKey === cartKey);

    if (existing) {
      const previousQty = existing.qty;
      const optimisticQty = previousQty + qty;
      setCartAndRef(setCart, cartRef, (previous) => previous.map((item) => item.cartKey === cartKey ? { ...item, qty: optimisticQty } : item));
      try {
        await enqueueMutation(() => updateCartItem(existing.rowId, { qty: optimisticQty }));
      } catch {
        restoreOnlyIfCurrentMatches(setCart, cartRef, cartKey, optimisticQty, (current) => current.map((item) => item.cartKey === cartKey ? { ...item, qty: previousQty } : item));
        await refetch();
        toast.error("افزودن به سبد خرید با خطا مواجه شد");
        return;
      }
    } else {
      const tempRowId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const optimisticItem = { ...product, rowId: tempRowId, cartKey, qty, size, ownerId };
      setCartAndRef(setCart, cartRef, (previous) => [...previous, optimisticItem]);
      try {
        const row = await enqueueMutation(() => createCartItem(toCartPayload(product, qty, size, cartKey, ownerId)));
        setCartAndRef(setCart, cartRef, (previous) => previous.map((item) => item.rowId === tempRowId ? fromCartRow(row) : item));
      } catch {
        setCartAndRef(setCart, cartRef, (previous) => previous.filter((item) => item.rowId !== tempRowId));
        await refetch();
        toast.error("افزودن به سبد خرید با خطا مواجه شد");
        return;
      }
    }

    flashBump();
    toast.success(`${product.name} به سبد خرید اضافه شد`, { description: size ? `سایز: ${size}` : undefined });
  }, [cartRef, enqueueMutation, flashBump, ownerId, refetch, setCart]);

  const changeQty = useCallback(async (cartKey, delta) => {
    const item = cartRef.current.find((cartItem) => cartItem.cartKey === cartKey);
    if (!item || !Number.isFinite(delta) || delta === 0) return;
    const previousQty = item.qty;
    const optimisticQty = previousQty + delta;

    if (optimisticQty <= 0) {
      setCartAndRef(setCart, cartRef, (previous) => previous.filter((cartItem) => cartItem.cartKey !== cartKey));
      try {
        await enqueueMutation(() => deleteCartItem(item.rowId));
      } catch {
        setCartAndRef(setCart, cartRef, (current) => current.some((cartItem) => cartItem.cartKey === cartKey) ? current : [...current, item]);
        await refetch();
        toast.error("بروزرسانی سبد خرید با خطا مواجه شد");
      }
      return;
    }

    setCartAndRef(setCart, cartRef, (previous) => previous.map((cartItem) => cartItem.cartKey === cartKey ? { ...cartItem, qty: optimisticQty } : cartItem));
    try {
      await enqueueMutation(() => updateCartItem(item.rowId, { qty: optimisticQty }));
    } catch {
      restoreOnlyIfCurrentMatches(setCart, cartRef, cartKey, optimisticQty, (current) => current.map((cartItem) => cartItem.cartKey === cartKey ? { ...cartItem, qty: previousQty } : cartItem));
      await refetch();
      toast.error("بروزرسانی سبد خرید با خطا مواجه شد");
    }
  }, [cartRef, enqueueMutation, refetch, setCart]);

  const removeItem = useCallback(async (cartKey) => {
    const removed = cartRef.current.find((item) => item.cartKey === cartKey);
    if (!removed) return;
    setCartAndRef(setCart, cartRef, (previous) => previous.filter((item) => item.cartKey !== cartKey));
    try {
      await enqueueMutation(() => deleteCartItem(removed.rowId));
    } catch {
      setCartAndRef(setCart, cartRef, (current) => current.some((item) => item.cartKey === cartKey) ? current : [...current, removed]);
      await refetch();
      toast.error("حذف از سبد خرید با خطا مواجه شد");
      return;
    }
    toast(`${removed.name} از سبد خرید حذف شد`);
  }, [cartRef, enqueueMutation, refetch, setCart]);

  return { addToCart, changeQty, removeItem };
}
