import { toast } from "sonner";
import { toman } from "../../../lib/data/products";

export default function CartDrawerFooter({ cartTotal }) {
  return (
    <footer className="px-6 py-5 border-t border-ink/10">
      <div className="flex items-center justify-between mb-4"><span className="text-sm text-ink/60">جمع کل</span><span className="font-extrabold text-lg text-forest">{toman(cartTotal)}</span></div>
      <button type="button" onClick={() => toast.info("فرایند تسویه حساب به‌زودی راه‌اندازی می‌شود")} className="cursor-pointer w-full font-bold py-3 rounded-full bg-camel hover:bg-camel-light text-forest transition-colors glow-camel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30">ادامه فرایند خرید</button>
    </footer>
  );
}
