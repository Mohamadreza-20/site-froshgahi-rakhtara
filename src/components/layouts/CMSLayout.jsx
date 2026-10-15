import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Topbar from "../cms/common/Topbar";
import Sidebar from "../cms/common/Sidebar";
import RouteTransition from "../shared/RouteTransition";
import { useAuthContext } from "../../context/AuthContext";
import { canAccessPanel } from "../../lib/roles";

function CMSLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { user, isAuthenticated } = useAuthContext();

	if (!isAuthenticated || !canAccessPanel(user)) {
		return <Navigate to="/forbidden" replace />;
	}

	return (
		<div
			dir="rtl"
			style={{ fontFamily: "'Vazirmatn', sans-serif" }}
			className="min-h-screen w-full flex"
		>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap');
        .tabular-nums { font-variant-numeric: tabular-nums; }
      `}</style>

			<Toaster
				position="top-center"
				dir="rtl"
				richColors
				closeButton
				toastOptions={{
					style: { fontFamily: "Vazirmatn, sans-serif", textAlign: "right" },
				}}
			/>

			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			<div
				className="flex-1 min-w-0 flex flex-col"
				style={{
					background: "linear-gradient(180deg, #F7F8FC 0%, #EFF2FB 100%)",
				}}
			>
				<Topbar onMenuClick={() => setSidebarOpen(true)} />
				<main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 pb-8">
					<RouteTransition variant="cms" />
				</main>
			</div>
		</div>
	);
}

export default CMSLayout;
