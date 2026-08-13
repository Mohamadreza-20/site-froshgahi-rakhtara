import React, { useState } from "react";
import { X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ModeratorLinks from "./fragments/ModeratorLinks";
import { useAuthContext } from "../../../../context/AuthContext";
import ConfirmDialog from "../../ui/ConfirmDialog";

function Sidebar({ isOpen = false, onClose = () => {} }) {
	const { signOut } = useAuthContext();
	const navigate = useNavigate();
	const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

	const handleLogoutClick = () => {
		setLogoutConfirmOpen(true);
	};

	const handleConfirmLogout = () => {
		signOut();
		setLogoutConfirmOpen(false);
		onClose();
		navigate("/");
		toast.success("با موفقیت از حساب کاربری خود خارج شدید");
	};

	return (
		<>
			{isOpen && (
				<div
					onClick={onClose}
					className="fixed inset-0 bg-black/40 z-40 lg:hidden"
				/>
			)}

			<aside
				className={`
					bg-white border-r border-[#EEF0F5] flex flex-col p-6
					w-72 max-w-[80%] shrink-0
					fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-in-out
					${isOpen ? "translate-x-0" : "translate-x-full"}
					lg:static lg:translate-x-0 lg:z-auto lg:w-64 xl:w-72 lg:min-h-screen
				`}
			>
				<div className="flex items-center justify-between mb-10">
					<div className="text-right">
						<div className="font-extrabold text-lg text-[#111827]">
							پنل مدیریت رخت‌آرا
						</div>
						<div className="text-[11px] text-[#9CA3AF]">فروشگاه پوشاک و اکسسوری</div>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center text-white font-bold text-sm shrink-0">
							ر
						</div>
						<button
							type="button"
							onClick={onClose}
							aria-label="بستن منو"
							className="cursor-pointer w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F5F6FA] lg:hidden"
						>
							<X size={18} />
						</button>
					</div>
				</div>

				<div className="text-xs text-[#9CA3AF] mb-3 px-1">منو اصلی:</div>
				<nav className="flex flex-col gap-1 flex-1 min-h-0 overflow-y-auto">
					<ModeratorLinks onNavigate={onClose} />
				</nav>

				<div className="mt-auto pt-6 border-t border-[#EEF0F5] shrink-0">
					<button
						type="button"
						onClick={handleLogoutClick}
						className="cursor-pointer w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-[#DC2626] hover:bg-[#FEF2F2] transition"
					>
						<LogOut size={18} />
						خروج از حساب کاربری
					</button>
				</div>
			</aside>

			<ConfirmDialog
				open={logoutConfirmOpen}
				onClose={() => setLogoutConfirmOpen(false)}
				onConfirm={handleConfirmLogout}
				title="خروج از حساب کاربری"
				description="آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟"
				confirmLabel="خروج"
				cancelLabel="انصراف"
			/>
		</>
	);
}

export default React.memo(Sidebar);
