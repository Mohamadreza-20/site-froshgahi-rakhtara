import { getGuestId } from "../cart/cart.utils";
import { STORAGE_KEYS } from "../storageKeys";
import { useCartMutationActions } from "./cart/useCartMutationActions";
import { useCartData } from "./cart/useCartData";
import { useCartPresentation } from "./cart/useCartPresentation";

const GUEST_ID_KEY = STORAGE_KEYS.guestCartId;

export function useCart({ user }) {
  const guestIdRef = getGuestId(GUEST_ID_KEY);
  const { cart, setCart, cartRef, enqueueMutation, ownerId, loading, error, refetch } = useCartData({
    userId: user?.id,
    guestId: guestIdRef,
  });
  const { bump, flashBump } = useCartPresentation();
  const { addToCart, changeQty, removeItem } = useCartMutationActions({
    cartRef,
    setCart,
    enqueueMutation,
    ownerId,
    flashBump,
    refetch,
  });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return {
    cart,
    cartCount,
    cartTotal,
    loading,
    error,
    bump,
    addToCart,
    changeQty,
    removeItem,
    refetch,
  };
}
