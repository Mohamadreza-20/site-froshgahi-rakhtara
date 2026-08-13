import { memo, useState } from "react";
import { Link } from "react-router-dom";
import {
	ShoppingBag,
	Menu,
	X,
	User,
	LogOut,
	LayoutDashboard,
} from "lucide-react";
import { toast } from "sonner";
import { NAV_LINKS } from "../../lib/data/products";
import { useAuthContext } from "../../context/AuthContext";
import { canAccessPanel } from "../../lib/roles";
import ConfirmDialog from "../cms/ui/ConfirmDialog";

function Header({
	cartCount,
	bump,
	menuOpen,
	setMenuOpen,
	onCartClick,
}) {
	const { user, isAuthenticated, signOut } = useAuthContext();
	const canOpenPanel = canAccessPanel(user);
	const panelHref = canOpenPanel ? "/dashboard/home" : "/account";
	const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

	const handleLogoutClick = () => {
		setLogoutConfirmOpen(true);
	};

	const handleConfirmLogout = () => {
		signOut();
		setLogoutConfirmOpen(false);
		setMenuOpen(false);
		toast.success("با موفقیت از حساب کاربری خود خارج شدید");
	};

	return (
		<header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-camel/20 shadow-sm shadow-ink/[0.03]">
			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
				<Link to="/" className="flex items-center gap-3">
					<span className="w-11 h-11 rounded-full bg-gradient-to-br from-forest to-forest-dark text-camel flex items-center justify-center font-extrabold text-lg shadow-md shadow-forest/20">
						ر
					</span>
					<span className="flex flex-col leading-tight text-right">
						<span className="font-extrabold text-xl text-forest">رخت‌آرا</span>
						<span className="text-[11px] tracking-widest text-ink/60">
							FASHION & ACCESSORY
						</span>
					</span>
				</Link>

				<nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							to={`/${link.href}`}
							className="relative py-1 transition-colors hover:text-rust after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:scale-x-0 after:bg-rust after:transition-transform hover:after:scale-x-100"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2 *:cursor-pointer">
					{isAuthenticated && (
						<Link
							to={panelHref}
							rel="noopener noreferrer"
							className="hidden sm:flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-cream"
						>
							<LayoutDashboard size={16} />
							{canOpenPanel ? "پنل مدیریت" : "پنل کاربری"}
						</Link>
					)}

					{!isAuthenticated && (
						<Link
							to="/auth"
							state={{ tab: "login" }}
							className="hidden sm:flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-cream"
						>
							<User size={16} />
							ثبت‌نام | ورود
						</Link>
					)}

					{isAuthenticated && (
						<button
							aria-label="خروج"
							onClick={handleLogoutClick}
							className="cursor-pointer p-2 rounded-full transition-colors hover:bg-forest/10 hover:text-forest"
						>
							<LogOut size={20} />
						</button>
					)}
					<button
						aria-label="سبد خرید"
						onClick={onCartClick}
						className="cursor-pointer relative p-2  rounded-full transition-colors hover:bg-forest/10 hover:text-forest"
					>
						<ShoppingBag size={20} />
						<span
							className={`absolute -top-1 -left-1 w-4 h-4 rounded-full bg-rust text-white text-[10px] flex items-center justify-center shadow-sm shadow-rust/40 ${
								bump ? "cart-bump" : ""
							}`}
						>
							{cartCount}
						</span>
					</button>
					<button
						aria-label="منو"
						onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
						className="cursor-pointer md:hidden p-2 rounded-full transition-colors hover:bg-forest/10 hover:text-forest"
					>
						{menuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{menuOpen && (
				<nav className="md:hidden border-t border-camel/20">
					<div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-ink/80">
						{NAV_LINKS.map((link) => (
							<Link
								key={link.href}
								to={`/${link.href}`}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
						{isAuthenticated && (
							<Link
								to={panelHref}
								rel="noopener noreferrer"
								className="flex items-center gap-2 font-bold text-forest"
								onClick={() => setMenuOpen(false)}
							>
								<LayoutDashboard size={16} />
								{canOpenPanel ? "پنل مدیریت" : "پنل کاربری"}
							</Link>
						)}
						{!isAuthenticated && (
							<Link
								to="/auth"
								state={{ tab: "login" }}
								className="flex items-center gap-2 font-bold text-forest"
								onClick={() => setMenuOpen(false)}
							>
								<User size={16} />
								ثبت‌نام | ورود
							</Link>
						)}
						{isAuthenticated && (
							<button
								onClick={handleLogoutClick}
								className="cursor-pointer flex items-center gap-2 font-bold text-right text-rust"
							>
								<LogOut size={16} />
								خروج
							</button>
						)}
					</div>
				</nav>
			)}

			<ConfirmDialog
				open={logoutConfirmOpen}
				onClose={() => setLogoutConfirmOpen(false)}
				onConfirm={handleConfirmLogout}
				title="خروج از حساب کاربری"
				description="آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟"
				confirmLabel="خروج"
				cancelLabel="انصراف"
			/>
		</header>
	);
}

export default memo(Header);

