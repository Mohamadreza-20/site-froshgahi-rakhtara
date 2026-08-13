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
		<div className="flex items-center justify-center gap-2 mt-12">
			<button
				type="button"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
				className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-ink/10 text-ink/60 hover:bg-forest hover:text-white hover:border-forest disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink/60 disabled:cursor-not-allowed transition"
				aria-label="صفحه قبل"
			>
				<ChevronRight size={18} />
			</button>

			{pages.map((page, idx) =>
				page === "..." ? (
					<span
						key={`dots-${idx}`}
						className="w-10 h-10 flex items-center justify-center text-ink/40"
					>
						...
					</span>
				) : (
					<button
						key={page}
						type="button"
						onClick={() => onPageChange(page)}
						className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition ${
							page === currentPage
								? "bg-forest text-white shadow-md shadow-forest/20"
								: "text-ink/70 border border-ink/10 hover:bg-forest/5"
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
				className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-ink/10 text-ink/60 hover:bg-forest hover:text-white hover:border-forest disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink/60 disabled:cursor-not-allowed transition"
				aria-label="صفحه بعد"
			>
				<ChevronLeft size={18} />
			</button>
		</div>
	);
}
