import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";

const MENU_WIDTH = 144;
const MENU_MARGIN = 8;

export default function ActionsMenu({ items }) {
	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState(null);
	const buttonRef = useRef(null);
	const menuRef = useRef(null);

	const calculatePosition = () => {
		const buttonElement = buttonRef.current;
		if (!buttonElement) return;
		const rect = buttonElement.getBoundingClientRect();

		const spaceBelow = window.innerHeight - rect.bottom;
		const menuHeight = menuRef.current?.offsetHeight ?? 100;
		const openUpward = spaceBelow < menuHeight + MENU_MARGIN;

		let left = rect.left;
		if (left + MENU_WIDTH > window.innerWidth - MENU_MARGIN) {
			left = window.innerWidth - MENU_MARGIN - MENU_WIDTH;
		}
		if (left < MENU_MARGIN) left = MENU_MARGIN;

		setPosition({
			left,
			top: openUpward ? rect.top - MENU_MARGIN : rect.bottom + MENU_MARGIN,
			openUpward,
		});
	};

	useLayoutEffect(() => {
		if (!open) return;
		calculatePosition();
	}, [open]);

	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event) => {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target) &&
				menuRef.current &&
				!menuRef.current.contains(event.target)
			) {
				setOpen(false);
			}
		};
		const handleKeyDown = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		const handleReposition = () => calculatePosition();

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);
		window.addEventListener("scroll", handleReposition, true);
		window.addEventListener("resize", handleReposition);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("scroll", handleReposition, true);
			window.removeEventListener("resize", handleReposition);
		};
	}, [open]);

	return (
		<div className="relative inline-block">
			<button
				ref={buttonRef}
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					setOpen((prev) => !prev);
				}}
				aria-label="عملیات بیشتر"
				className="cursor-pointer text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F5F6FA] p-1 rounded-lg transition"
			>
				<MoreHorizontal size={18} />
			</button>

			{open &&
				createPortal(
					<div
						ref={menuRef}
						dir="rtl"
						style={{
							position: "fixed",
							top: position ? position.top : 0,
							left: position ? position.left : 0,
							transform: position?.openUpward ? "translateY(-100%)" : "none",
							visibility: position ? "visible" : "hidden",
						}}
						className="w-36 bg-white rounded-xl border border-[#EEF0F5] shadow-lg shadow-black/[0.06] py-1.5 z-[999]"
					>
						{items.map((item) => (
							<button
								key={item.label}
								type="button"
								onClick={() => {
									setOpen(false);
									item.onClick();
								}}
								className={`cursor-pointer w-full flex items-center gap-2 px-3.5 py-2 text-sm text-right transition ${
									item.danger
										? "text-[#DC2626] hover:bg-[#FEF2F2]"
										: "text-[#374151] hover:bg-[#F5F6FA]"
								}`}
							>
								{item.icon && <item.icon size={15} />}
								{item.label}
							</button>
						))}
					</div>,
					document.body,
				)}
		</div>
	);
}
