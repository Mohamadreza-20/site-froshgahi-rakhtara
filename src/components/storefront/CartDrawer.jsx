import { useId, useRef } from "react";
import CartDrawerHeader from "./cart-drawer/CartDrawerHeader";
import CartDrawerContent from "./cart-drawer/CartDrawerContent";
import CartDrawerFooter from "./cart-drawer/CartDrawerFooter";
import useDialogFocus from "./cart-drawer/useDialogFocus";

export default function CartDrawer({ cart, cartTotal, onClose, changeQty, removeItem }) {
  const panelRef = useRef(null);
  const titleId = useId();
  useDialogFocus(panelRef, onClose);
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/40 cart-backdrop-enter" onMouseDown={onClose}>
      <section ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className="w-full max-w-sm h-full flex flex-col bg-cream cart-panel-enter focus:outline-none" onMouseDown={(event) => event.stopPropagation()}>
        <CartDrawerHeader titleId={titleId} onClose={onClose} />
        <CartDrawerContent cart={cart} changeQty={changeQty} removeItem={removeItem} />
        {cart.length > 0 ? <CartDrawerFooter cartTotal={cartTotal} /> : null}
      </section>
    </div>
  );
}
