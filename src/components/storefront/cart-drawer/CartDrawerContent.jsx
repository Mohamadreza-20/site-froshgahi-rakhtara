import CartDrawerItem from "./CartDrawerItem";

export default function CartDrawerContent({ cart, changeQty, removeItem }) {
  const productTotals = cart.reduce((totals, item) => {
    const productId = String(item.id);
    totals.set(productId, (totals.get(productId) || 0) + (Number(item.qty) || 0));
    return totals;
  }, new Map());

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4" aria-live="polite">
      {cart.length === 0 ? (
        <p className="text-center mt-10 text-ink/50">سبد خرید شما خالی است</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const productTotal = productTotals.get(String(item.id)) || 0;
            const availableForItem = Math.max(0, (Number(item.stock) || 0) - (productTotal - (Number(item.qty) || 0)));
            return <CartDrawerItem key={item.cartKey} item={{ ...item, availableQty: availableForItem }} onChangeQty={changeQty} onRemove={removeItem} />;
          })}
        </div>
      )}
    </div>
  );
}
