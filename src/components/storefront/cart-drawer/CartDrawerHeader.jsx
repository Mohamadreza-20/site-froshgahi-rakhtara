import { X } from "lucide-react";

export default function CartDrawerHeader({ titleId, onClose }) {
  return (
    <header className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
      <h2 id={titleId} className="font-extrabold text-lg text-forest">سبد خرید</h2>
      <button type="button" onClick={onClose} aria-label="بستن سبد خرید" className="cursor-pointer p-1 rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30">
        <X size={20} aria-hidden="true" />
      </button>
    </header>
  );
}
