import { Loader2 } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmDialog({
	open,
	onClose,
	onConfirm,
	title = "تایید حذف",
	description,
	confirmLabel = "حذف",
	cancelLabel = "انصراف",
	loading = false,
}) {
	const handleClose = () => {
		if (loading) return;
		onClose?.();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={title}
			footer={
				<>
					<button
						type="button"
						onClick={handleClose}
						disabled={loading}
						className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F5F6FA] transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{cancelLabel}
					</button>
					<button
						type="button"
						onClick={onConfirm}
						disabled={loading}
						className="cursor-pointer flex items-center gap-1.5 bg-[#DC2626] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#B91C1C] transition shadow-sm shadow-[#DC2626]/20 disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{loading && <Loader2 size={15} className="animate-spin" />}
						{loading ? "در حال حذف..." : confirmLabel}
					</button>
				</>
			}
		>
			<p className="text-sm text-[#6B7280] leading-6">{description}</p>
		</Modal>
	);
}
