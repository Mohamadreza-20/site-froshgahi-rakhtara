import OptimizedImage from "../../../shared/OptimizedImage";
import React from "react";
import { Home, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import { getAvatarUrl } from "../../../../utils/avatar";

function Topbar({ onMenuClick = () => {} }) {
	const { user } = useAuthContext();
	const name = user?.name || "کاربر";
	const role = user?.role || "";

	return (
		<header className="h-auto min-h-20 py-3 flex flex-wrap items-center gap-3 justify-between px-4 sm:px-8 shrink-0 w-full">
			<div className="flex items-center gap-2 sm:gap-3">
				<button
					type="button"
					onClick={onMenuClick}
					aria-label="باز کردن منو"
					className="cursor-pointer w-10 h-10 rounded-xl bg-white border border-[#EEF0F5] flex items-center justify-center text-[#111827] lg:hidden shrink-0"
				>
					<Menu size={18} />
				</button>

				<OptimizedImage
					src={getAvatarUrl(user?.seed || user?.name || user?.email || "مدیر")}
					alt=""
					className="w-11 h-11 rounded-full bg-[#EEF0FF] object-cover shrink-0"
				/>
				<div className="hidden sm:block">
					<div className="font-bold text-sm text-[#111827] leading-none">
						{name}
					</div>
					<div className="text-xs text-[#9CA3AF] mt-1.5">{role}</div>
				</div>
			</div>

			<Link
				to="/"
				className="order-last sm:order-none flex items-center gap-1.5 shrink-0 text-sm font-medium text-[#374151] border border-[#EEF0F5] bg-white px-4 py-2.5 rounded-xl hover:bg-[#F7F8FC] transition"
			>
				<Home size={16} />
				بازگشت به صفحه اصلی
			</Link>
		</header>
	);
}

export default React.memo(Topbar);
