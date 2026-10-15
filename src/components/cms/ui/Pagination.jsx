import { ChevronRight, ChevronLeft } from "lucide-react";

function getPageList(current, total) {
	const pages = [];
	const delta = 1;
	const range = [];

	for (
		let pageNumber = Math.max(2, current - delta);
		pageNumber <= Math.min(total - 1, current + delta);
		pageNumber++
	) {
		range.push(pageNumber);
	}

	if (total <= 1) return [1];

	pages.push(1);
	if (range[0] > 2) pages.push("...");
	pages.push(...range);
	if (range[range.length - 1] < total - 1) pages.push("...");
	pages.push(total);

	return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
	if (totalPages <= 1) return null;

	const pages = getPageList(currentPage, totalPages);

	return (
		<div className="flex items-center justify-center gap-1.5 pt-2">
			<button
				type="button"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
				className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg border border-[#EEF0F5] text-[#6B7280] hover:bg-[#F7F8FC] disabled:opacity-40 disabled:cursor-not-allowed transition"
				aria-label="صفحه قبل"
			>
				<ChevronRight size={16} />
			</button>

			{pages.map((page, idx) =>
				page === "..." ? (
					<span
						key={`dots-${idx}`}
						className="w-9 h-9 flex items-center justify-center text-[#9CA3AF] text-sm"
					>
						...
					</span>
				) : (
					<button
						key={page}
						type="button"
						onClick={() => onPageChange(page)}
						className={`cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition tabular-nums ${
							page === currentPage
								? "bg-[#6C63FF] text-white shadow-sm shadow-[#6C63FF]/30"
								: "text-[#374151] border border-[#EEF0F5] hover:bg-[#F7F8FC]"
						}`}
					>
						{page}
					</button>
				),
			)}

			<button
				type="button"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg border border-[#EEF0F5] text-[#6B7280] hover:bg-[#F7F8FC] disabled:opacity-40 disabled:cursor-not-allowed transition"
				aria-label="صفحه بعد"
			>
				<ChevronLeft size={16} />
			</button>
		</div>
	);
}
