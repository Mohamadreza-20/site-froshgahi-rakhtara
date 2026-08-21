import { ChevronLeft } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { canAccessPanel } from "../lib/roles";
import AccountHeader from "../components/storefront/account/AccountHeader";
import ProfileForm from "../components/storefront/account/ProfileForm";
import PasswordForm from "../components/storefront/account/PasswordForm";
import MyMessagesSection from "../components/cms/features/account/MyMessagesSection";
import { usePageMeta } from "../lib/hooks/usePageMeta";

export default function AccountPage() {
  usePageMeta({ title: "حساب کاربری | Rakhtara", description: "مدیریت اطلاعات حساب کاربری Rakhtara.", path: "/account", robots: "noindex, nofollow" });
  const { user, isAuthenticated, updateUser } = useAuthContext();
  if (!isAuthenticated) return <Navigate to="/auth" state={{ tab: "login" }} replace />;
  if (canAccessPanel(user)) return <Navigate to="/dashboard/home" replace />;

  return <div className="max-w-5xl mx-auto px-6 py-10">
    <div className="flex items-center gap-2 text-sm mb-8 text-ink/50"><Link to="/" className="hover:underline text-forest">خانه</Link><ChevronLeft size={14} /><span>پنل کاربری</span></div>
    <AccountHeader user={user} />
    <div className="grid md:grid-cols-2 gap-6"><ProfileForm user={user} onSaved={updateUser} /><PasswordForm user={user} /></div>
    <MyMessagesSection userId={user.id} />
  </div>;
}
