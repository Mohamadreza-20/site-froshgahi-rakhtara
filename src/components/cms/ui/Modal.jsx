import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(",");

export default function Modal({ open, onClose, title, description, children, footer }) {
	const dialogRef = useRef(null);
	const previousActiveElement = useRef(null);
	const titleId = useId();
	const descriptionId = useId();

	useEffect(() => {
		if (!open) return undefined;
		previousActiveElement.current = document.activeElement;
		document.body.style.overflow = "hidden";

		const dialog = dialogRef.current;
		const focusable = dialog?.querySelectorAll(FOCUSABLE_SELECTOR);
		(focusable?.[0] || dialog)?.focus();

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose?.();
				return;
			}
			if (event.key !== "Tab" || !dialog) return;

			const elements = dialog.querySelectorAll(FOCUSABLE_SELECTOR);
			if (!elements.length) {
				event.preventDefault();
				return;
			}
			const first = elements[0];
			const last = elements[elements.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
			previousActiveElement.current?.focus?.();
		};
	}, [open, onClose]);

	if (!open) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
			<div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" onMouseDown={onClose} />
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={description ? descriptionId : undefined}
				tabIndex={-1}
				className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl shadow-black/10 border border-[#EEF0F5] animate-[fadeIn_0.15s_ease-out]"
			>
				<div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF0F5]">
					<h2 id={titleId} className="font-bold text-lg text-[#111827]">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className="cursor-pointer text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F5F6FA] p-1.5 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"
						aria-label="بستن پنجره"
					>
						<X size={18} aria-hidden="true" />
					</button>
				</div>

				<div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
				{description && <p id={descriptionId} className="text-sm text-[#6B7280] leading-6 mb-4">{description}</p>}
				{children}
			</div>

				{footer && <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#EEF0F5]">{footer}</div>}
			</div>
		</div>,
		document.body,
	);
}
