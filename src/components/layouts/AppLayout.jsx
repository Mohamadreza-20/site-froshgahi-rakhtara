import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../storefront/Header";
import { Toaster } from "sonner";
import Footer from "../storefront/Footer";
import CartDrawer from "../storefront/CartDrawer";
import { toast } from "sonner";
import TopLoadingBar from "../shared/TopLoadingBar";
import RouteTransition from "../shared/RouteTransition";
import { useAuthContext } from "../../context/AuthContext";
import {
	getCartItems,
	createCartItem,
	updateCartItem,
	deleteCartItem,
} from "../../services/cart";

const GUEST_ID_KEY = "nemonekar_cart_guest_id";

function getGuestId() {
	try {
		let id = localStorage.getItem(GUEST_ID_KEY);
		if (!id) {
			id = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
			localStorage.setItem(GUEST_ID_KEY, id);
		}
		return id;
	} catch {
		return `guest-${Date.now()}`;
	}
}

function fromRow(row) {
	return {
		id: row.productId,
		rowId: row.id,
		name: row.name,
		price: row.price,
		image: row.image,
		gradient: row.gradient,
		size: row.size,
		qty: row.qty,
		cartKey: row.cartKey,
	};
}

function ScrollManager() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const el = document.querySelector(hash);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
				return;
			}
		}
		window.scrollTo({ top: 0 });
	}, [pathname, hash]);

	return null;
}

const MainOutlet = memo(function MainOutlet({ outletContext }) {
	return (
		<main>
			<RouteTransition outletContext={outletContext} />
		</main>
	);
});

function AppLayout() {
	const { user, isAuthenticated } = useAuthContext();
	const ownerId = user?.id || getGuestId();
	const navigate = useNavigate();
	const location = useLocation();

	const [menuOpen, setMenuOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);
	const [cart, setCart] = useState([]);
	const bumpTimeout = useRef(null);
	const [bump, setBump] = useState(false);

	const cartCount = useMemo(() => cart.reduce((sum, cartItem) => sum + cartItem.qty, 0), [cart]);
	const cartTotal = useMemo(
		() => cart.reduce((sum, cartItem) => sum + cartItem.qty * cartItem.price, 0),
		[cart],
	);

	const cartRef = useRef(cart);
	useEffect(() => {
		cartRef.current = cart;
	}, [cart]);

	useEffect(() => {
		let cancelled = false;
		async function loadCart() {
			try {
				const rows = await getCartItems(ownerId);
				if (!cancelled) setCart(rows.map(fromRow));
			} catch (error) {
				console.error("بارگذاری سبد خرید با خطا مواجه شد:", error);
			}
		}
		loadCart();
		return () => {
			cancelled = true;
		};
	}, [ownerId]);

	useEffect(() => () => clearTimeout(bumpTimeout.current), []);

	const addToCart = useCallback(async (product, qty = 1, size = null) => {
		if (!isAuthenticated) {
			toast("برای افزودن به سبد خرید ابتدا وارد حساب کاربری خود شوید");
			navigate("/auth", {
				state: { tab: "login", from: location.pathname },
			});
			return;
		}

		const cartKey = size ? `${product.id}-${size}` : `${product.id}`;
		const existing = cartRef.current.find((cartItem) => cartItem.cartKey === cartKey);

		try {
			if (existing) {
				const newQty = existing.qty + qty;
				await updateCartItem(existing.rowId, { qty: newQty });
				setCart((prev) =>
					prev.map((cartItem) =>
					cartItem.cartKey === cartKey ? { ...cartItem, qty: newQty } : cartItem,
				),
				);
			} else {
				const row = await createCartItem({
					ownerId,
					productId: product.id,
					name: product.name,
					price: product.price,
					image: product.image,
					gradient: product.gradient,
					size,
					qty,
					cartKey,
				});
				setCart((prev) => [...prev, fromRow(row)]);
			}
		} catch (error) {
			console.error("افزودن به سبد خرید با خطا مواجه شد:", error);
			toast.error("افزودن به سبد خرید با خطا مواجه شد");
			return;
		}

		setBump(true);
		clearTimeout(bumpTimeout.current);
		bumpTimeout.current = setTimeout(() => setBump(false), 300);
		toast.success(`${product.name} به سبد خرید اضافه شد`, {
			description: size ? `سایز: ${size}` : undefined,
		});
	}, [ownerId, isAuthenticated, navigate, location.pathname]);

	const changeQty = useCallback(async (cartKey, delta) => {
		const item = cartRef.current.find((cartItem) => cartItem.cartKey === cartKey);
		if (!item) return;
		const newQty = item.qty + delta;

		try {
			if (newQty <= 0) {
				await deleteCartItem(item.rowId);
				setCart((prev) => prev.filter((cartItem) => cartItem.cartKey !== cartKey));
			} else {
				await updateCartItem(item.rowId, { qty: newQty });
				setCart((prev) =>
					prev.map((cartItem) =>
					cartItem.cartKey === cartKey ? { ...cartItem, qty: newQty } : cartItem,
				),
				);
			}
		} catch (error) {
			console.error("بروزرسانی سبد خرید با خطا مواجه شد:", error);
			toast.error("بروزرسانی سبد خرید با خطا مواجه شد");
		}
	}, []);

	const removeItem = useCallback(async (cartKey) => {
		const removed = cartRef.current.find((cartItem) => cartItem.cartKey === cartKey);
		if (!removed) return;

		try {
			await deleteCartItem(removed.rowId);
			setCart((prev) => prev.filter((cartItem) => cartItem.cartKey !== cartKey));
			toast(`${removed.name} از سبد خرید حذف شد`);
		} catch (error) {
			console.error("حذف از سبد خرید با خطا مواجه شد:", error);
			toast.error("حذف از سبد خرید با خطا مواجه شد");
		}
	}, []);

	const outletContext = useMemo(() => ({ addToCart }), [addToCart]);

	const openCart = useCallback(() => setCartOpen(true), []);
	const closeCart = useCallback(() => setCartOpen(false), []);

	return (
		<>
			<ScrollManager />
			<TopLoadingBar />
			<Toaster
				position="top-center"
				dir="rtl"
				richColors
				closeButton
				toastOptions={{
					style: { fontFamily: "Vazirmatn, sans-serif", textAlign: "right" },
				}}
			/>
			<div
				dir="rtl"
				className="min-h-screen antialiased font-vazir bg-cream text-ink"
			>
				<Header
					cartCount={cartCount}
					bump={bump}
					menuOpen={menuOpen}
					setMenuOpen={setMenuOpen}
					onCartClick={openCart}
				/>

				<MainOutlet outletContext={outletContext} />

				<Footer />

				{cartOpen && (
					<CartDrawer
						cart={cart}
						cartTotal={cartTotal}
						onClose={closeCart}
						changeQty={changeQty}
						removeItem={removeItem}
					/>
				)}
			</div>
		</>
	);
}

export default AppLayout;
