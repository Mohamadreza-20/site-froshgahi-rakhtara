import { Plus, Loader2 } from "lucide-react";

export function PrimaryButton({ children, loading = false, disabled, ...props }) {
	return (
		<button
			{...props}
			disabled={disabled || loading}
			className="flex cursor-pointer items-center gap-1.5 bg-[#16A34A] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#128a3e] transition shadow-sm shadow-[#16A34A]/20 disabled:opacity-60 disabled:cursor-not-allowed"
		>
			{loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
			{children}
		</button>
	);
}

export default function PageHeader({ title, actionLabel, onAction }) {
	return (
		<div className="flex items-center justify-between">
			{actionLabel && onAction ? (
				<PrimaryButton onClick={onAction}>{actionLabel}</PrimaryButton>
			) : (
				<span />
			)}
			<h1 className="font-bold text-2xl text-[#111827]">{title}</h1>
		</div>
	);
}
