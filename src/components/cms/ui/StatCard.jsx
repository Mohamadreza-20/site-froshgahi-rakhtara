export default function StatCard({
	label,
	value,
	suffix,
	icon: Icon,
	valueClassName = "text-[#111827]",
}) {
	if (Icon) {
		return (
			<div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 flex items-start gap-4 flex-row-reverse text-right shadow-sm shadow-black/[0.02]">
				<div className="w-11 h-11 rounded-xl bg-[#E9F7EF] flex items-center justify-center shrink-0">
					<Icon size={19} className="text-[#16A34A]" />
				</div>
				<div className="flex-1">
					<div className="text-sm text-[#6B7280] mb-2">{label}</div>
					<div className="text-2xl font-bold text-[#111827] tabular-nums">
						{value}{" "}
						<span className="text-sm font-normal text-[#9CA3AF]">{suffix}</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 text-right shadow-sm shadow-black/[0.02]">
			<div className="text-sm text-[#6B7280] mb-2">{label}</div>
			<div className={`text-2xl font-bold tabular-nums ${valueClassName}`}>
				{value}
			</div>
		</div>
	);
}
