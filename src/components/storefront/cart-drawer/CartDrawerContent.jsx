import CartDrawerItem from "./CartDrawerItem";

export default function CartDrawerContent({ cart, changeQty, removeItem }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4" aria-live="polite">
      {cart.length === 0 ? (
        <p className="text-center mt-10 text-ink/50">سبد خرید شما خالی است</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => <CartDrawerItem key={item.cartKey} item={item} onChangeQty={changeQty} onRemove={removeItem} />)}
        </div>
      )}
    </div>
  );
}
