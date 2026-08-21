import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { NAV_LINKS } from "../../lib/data/products";
import { useAuthContext } from "../../context/AuthContext";
import { canAccessPanel } from "../../lib/roles";
import ConfirmDialog from "../cms/ui/ConfirmDialog";
import HeaderDesktopActions from "./HeaderDesktopActions";
import HeaderMobileMenu from "./HeaderMobileMenu";

export default function Header({cartCount,bump,menuOpen,setMenuOpen,onCartClick}){
 const {user,isAuthenticated,signOut}=useAuthContext();const canOpenPanel=canAccessPanel(user);const panelHref=canOpenPanel?"/dashboard/home":"/account";const [logoutConfirmOpen,setLogoutConfirmOpen]=useState(false);
 const confirmLogout=()=>{signOut();setLogoutConfirmOpen(false);setMenuOpen(false);toast.success("با موفقیت از حساب کاربری خود خارج شدید")};
 return <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-camel/20 shadow-sm shadow-ink/[0.03]"><div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20"><Link to="/" className="flex items-center gap-3"><span className="w-11 h-11 rounded-full bg-gradient-to-br from-forest to-forest-dark text-camel flex items-center justify-center font-extrabold text-lg">ر</span><span className="flex flex-col leading-tight text-right"><span className="font-extrabold text-xl text-forest">رخت‌آرا</span><span className="text-[11px] tracking-widest text-ink/60">FASHION & ACCESSORY</span></span></Link><nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80">{NAV_LINKS.map((link)=><Link key={link.href} to={`/${link.href}`} className="relative py-1 transition-colors hover:text-rust">{link.label}</Link>)}</nav><div className="flex items-center gap-2"><HeaderDesktopActions isAuthenticated={isAuthenticated} canOpenPanel={canOpenPanel} panelHref={panelHref} onLogout={()=>setLogoutConfirmOpen(true)} onCartClick={onCartClick} cartCount={cartCount} bump={bump}/><HeaderMobileMenu open={menuOpen} setOpen={setMenuOpen} isAuthenticated={isAuthenticated} canOpenPanel={canOpenPanel} panelHref={panelHref} onLogout={()=>setLogoutConfirmOpen(true)}/></div></div><ConfirmDialog open={logoutConfirmOpen} onClose={()=>setLogoutConfirmOpen(false)} onConfirm={confirmLogout} title="خروج از حساب کاربری" description="آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟" confirmLabel="خروج" cancelLabel="انصراف"/></header>;
}
