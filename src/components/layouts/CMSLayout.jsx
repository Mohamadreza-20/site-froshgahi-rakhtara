import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Topbar from "../cms/common/Topbar";
import Sidebar from "../cms/common/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import { canAccessPanel } from "../../lib/roles";
import { usePageMeta } from "../../lib/hooks/usePageMeta";

function CMSLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated } = useAuthContext();
  const location = useLocation();

  usePageMeta({
    title: "مدیریت فروشگاه | Rakhtara",
    description: "پنل مدیریت فروشگاه Rakhtara.",
    path: location.pathname,
    robots: "noindex, nofollow",
  });

  if (!isAuthenticated || !canAccessPanel(user)) {
    return <Navigate to="/forbidden" replace />;
  }

  return (
    <div dir="rtl" style={{ fontFamily: "'Vazirmatn', sans-serif" }} className="min-h-screen w-full flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col" style={{ background: "linear-gradient(180deg, #F7F8FC 0%, #EFF2FB 100%)" }}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 pb-8" aria-label="محتوای مدیریت">
          <div className="route-cms-in"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}

export default CMSLayout;
