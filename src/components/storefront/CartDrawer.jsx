import { memo } from "react";
import { toast } from "sonner";
import { X, Plus, Minus, Trash2, ImageOff } from "lucide-react";
import { toman } from "../../lib/data/products";

function CartDrawer({ cart, cartTotal, onClose, changeQty, removeItem }) {
	return (
		<div
			className="fixed inset-0 z-[60] flex justify-end bg-black/40 cart-backdrop-enter"
			onClick={onClose}
		>
			<div
				className="w-full max-w-sm h-full flex flex-col bg-cream cart-panel-enter"
				onClick={(event) => event.stopPropagation()}
			>
				<div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
					<h3 className="font-extrabold text-lg text-forest">سبد خرید</h3>
					<button
						onClick={onClose}
						aria-label="بستن"
						className="cursor-pointer p-1 rounded-full hover:bg-black/5"
					>
						<X size={20} />
					</button>
				</div>
				<div className="flex-1 overflow-y-auto px-6 py-4">
					{cart.length === 0 ? (
						<p className="text-center mt-10 text-ink/50">
							سبد خرید شما خالی است
						</p>
					) : (
						<div className="space-y-4">
							{cart.map((item) => (
								<div
									key={item.cartKey}
									className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-ink/10"
								>
									<div
										className={`w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-gradient-to-br ${item.gradient || "from-cream-dark to-camel-light/40"}`}
									>
										{item.image ? (
											<img
												src={item.image}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										) : (
											<ImageOff size={18} className="text-cream/70" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-bold text-sm truncate text-forest">
											{item.name}
											{item.size ? ` (سایز ${item.size})` : ""}
										</p>
										<p className="text-xs text-ink/50">{toman(item.price)}</p>
									</div>
									<div className="flex items-center gap-2">
										<button
											onClick={() => changeQty(item.cartKey, -1)}
											className="cursor-pointer w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center"
										>
											<Minus size={12} />
										</button>
										<span className="text-sm w-4 text-center">{item.qty}</span>
										<button
											onClick={() => changeQty(item.cartKey, 1)}
											className="cursor-pointer w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center"
										>
											<Plus size={12} />
										</button>
									</div>
									<button
										onClick={() => removeItem(item.cartKey)}
										aria-label="حذف"
										className="cursor-pointer p-1 text-rust"
									>
										<Trash2 size={16} />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
				{cart.length > 0 && (
					<div className="px-6 py-5 border-t border-ink/10">
						<div className="flex items-center justify-between mb-4">
							<span className="text-sm text-ink/60">جمع کل</span>
							<span className="font-extrabold text-lg text-forest">
								{toman(cartTotal)}
							</span>
						</div>
						<button
							onClick={() =>
								toast.info("فرایند تسویه حساب به‌زودی راه‌اندازی می‌شود")
							}
							className="cursor-pointer w-full font-bold py-3 rounded-full bg-camel hover:bg-camel-light text-forest transition-colors glow-camel"
						>
							ادامه فرایند خرید
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default memo(CartDrawer);
