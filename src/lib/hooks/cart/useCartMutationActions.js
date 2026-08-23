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
    const requestedQty = Number(qty);
    const stock = Number(product?.stock);
    if (!product || !Number.isFinite(requestedQty) || requestedQty <= 0 || !Number.isFinite(stock) || stock <= 0) {
      if (product && Number.isFinite(stock) && stock <= 0) toast.info("این محصول موجود نیست");
      return false;
    }

    const cartKey = getCartKey(product.id, size);
    const existing = cartRef.current.find((item) => item.cartKey === cartKey);
    const previousQty = existing?.qty ?? 0;
    const sameProductQty = cartRef.current.reduce(
      (sum, item) => sum + (String(item.id) === String(product.id) ? Number(item.qty) || 0 : 0),
      0,
    );
    const availableToAdd = Math.max(0, stock - (sameProductQty - previousQty));

    if (requestedQty > availableToAdd) {
      toast.info(availableToAdd === 0
        ? "موجودی این محصول برای افزودن بیشتر کافی نیست"
        : `فقط ${availableToAdd.toLocaleString("fa-IR")} عدد از این محصول امکان افزودن دارد`);
      return false;
    }

    const nextQty = previousQty + requestedQty;

    if (existing) {
      const optimisticQty = nextQty;
      setCartAndRef(setCart, cartRef, (previous) => previous.map((item) => item.cartKey === cartKey ? { ...item, qty: optimisticQty } : item));
      try {
        await enqueueMutation(() => updateCartItem(existing.rowId, { qty: optimisticQty, stock }));
      } catch {
        restoreOnlyIfCurrentMatches(setCart, cartRef, cartKey, optimisticQty, (current) => current.map((item) => item.cartKey === cartKey ? { ...item, qty: previousQty } : item));
        await refetch();
        toast.error("افزودن به سبد خرید با خطا مواجه شد");
        return false;
      }
    } else {
      const tempRowId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const optimisticItem = { ...product, rowId: tempRowId, cartKey, qty: nextQty, size, ownerId, stock };
      setCartAndRef(setCart, cartRef, (previous) => [...previous, optimisticItem]);
      try {
        const row = await enqueueMutation(() => createCartItem(toCartPayload(product, nextQty, size, cartKey, ownerId)));
        setCartAndRef(setCart, cartRef, (previous) => previous.map((item) => item.rowId === tempRowId ? fromCartRow(row) : item));
      } catch {
        setCartAndRef(setCart, cartRef, (previous) => previous.filter((item) => item.rowId !== tempRowId));
        await refetch();
        toast.error("افزودن به سبد خرید با خطا مواجه شد");
        return false;
      }
    }

    flashBump();
    toast.success(`${product.name} به سبد خرید اضافه شد`, { description: size ? `سایز: ${size}` : undefined });
    return true;
  }, [cartRef, enqueueMutation, flashBump, ownerId, refetch, setCart]);

  const changeQty = useCallback(async (cartKey, delta) => {
    const item = cartRef.current.find((cartItem) => cartItem.cartKey === cartKey);
    if (!item || !Number.isFinite(delta) || delta === 0) return;
    const previousQty = item.qty;
    const stock = Number(item.stock);
    const sameProductQty = cartRef.current.reduce(
      (sum, cartItem) => sum + (String(cartItem.id) === String(item.id) ? Number(cartItem.qty) || 0 : 0),
      0,
    );
    const availableForItem = Number.isFinite(stock)
      ? Math.max(0, stock - (sameProductQty - previousQty))
      : Number.POSITIVE_INFINITY;
    if (delta > 0 && Number.isFinite(availableForItem) && previousQty >= availableForItem) {
      toast.info("بیشتر از موجودی این محصول نمی‌توانید اضافه کنید");
      return;
    }
    const optimisticQty = delta > 0 && Number.isFinite(availableForItem)
      ? Math.min(previousQty + delta, availableForItem)
      : previousQty + delta;

    if (optimisticQty === previousQty) {
      toast.info("بیشتر از موجودی این محصول نمی‌توانید اضافه کنید");
      return;
    }

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
