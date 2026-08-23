import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../storefront/Header";
import Footer from "../storefront/Footer";
import CartDrawer from "../storefront/CartDrawer";
import TopLoadingBar from "../shared/TopLoadingBar";
import { useAuthContext } from "../../context/AuthContext";
import { useCart } from "../../lib/hooks/useCart";

function MainOutlet({ outletContext }) {
	return <main><Outlet context={outletContext} /></main>;
}

function AppLayout() {
	const { user, isAuthenticated } = useAuthContext();
	const {
		cart,
		cartCount,
		cartTotal,
		bump,
		addToCart,
		changeQty,
		removeItem,
	} = useCart({ user, isAuthenticated });
	const { pathname, hash } = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);

	useEffect(() => {
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
				return;
			}
		}
		window.scrollTo({ top: 0 });
	}, [pathname, hash]);

	return (
		<>
			<TopLoadingBar />
			<div
				dir="rtl"
				className="min-h-screen antialiased font-vazir bg-cream text-ink"
			>
				<Header
					cartCount={cartCount}
					bump={bump}
					menuOpen={menuOpen}
					setMenuOpen={setMenuOpen}
					onCartClick={() => setCartOpen(true)}
				/>

				<MainOutlet outletContext={{ addToCart, cart }} />
				<Footer />

				{cartOpen && (
					<CartDrawer
						cart={cart}
						cartTotal={cartTotal}
						onClose={() => setCartOpen(false)}
						changeQty={changeQty}
						removeItem={removeItem}
					/>
				)}
			</div>
		</>
	);
}

export default AppLayout;
