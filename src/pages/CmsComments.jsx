import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Trash2, MessageSquare } from "lucide-react";
import { PageHeader, StatCard, ConfirmDialog, Pagination } from "../components/cms/ui";
import StarRating from "../components/storefront/StarRating";
import { getAllComments, deleteComment } from "../services/comments";
import { getProduct } from "../services/products";

const PAGE_SIZE = 8;

export default function CmsComments() {
	const [comments, setComments] = useState([]);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [deletingComment, setDeletingComment] = useState(null);
	const [deleting, setDeleting] = useState(false);

	async function loadData() {
		setLoading(true);
		try {
			const [commentsData, productsData] = await Promise.all([
				getAllComments(),
				getProduct(),
			]);
			setComments(commentsData);
			setProducts(productsData);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadData();
	}, []);

	const productNameMap = useMemo(() => {
		const map = new Map();
		products.forEach((product) => map.set(String(product.id), product.name));
		return map;
	}, [products]);

	const filtered = useMemo(() => {
		const trimmedQuery = query.trim();
		if (!trimmedQuery) return comments;
		return comments.filter(
			(comment) =>
				comment.name?.includes(trimmedQuery) ||
				comment.text?.includes(trimmedQuery) ||
				(productNameMap.get(String(comment.productId)) || "").includes(trimmedQuery),
		);
	}, [comments, query, productNameMap]);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

	useEffect(() => {
		setCurrentPage(1);
	}, [query]);

	useEffect(() => {
		if (currentPage > totalPages) setCurrentPage(totalPages);
	}, [totalPages, currentPage]);

	const paginated = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return filtered.slice(start, start + PAGE_SIZE);
	}, [filtered, currentPage]);

	const { avgRating, fiveStarCount, lowRatingCount } = useMemo(() => {
		if (!comments.length) return { avgRating: 0, fiveStarCount: 0, lowRatingCount: 0 };
		let sum = 0;
		let fiveStarCount = 0;
		let lowRatingCount = 0;
		for (const comment of comments) {
			const rating = Number(comment.rating || 0);
			sum += rating;
			if (rating === 5) fiveStarCount += 1;
			if (rating <= 2) lowRatingCount += 1;
		}
		return { avgRating: sum / comments.length, fiveStarCount, lowRatingCount };
	}, [comments]);

	const handleDeleteComment = async () => {
		if (!deletingComment) return;
		setDeleting(true);
		try {
			await deleteComment(deletingComment.id);
			setComments((prev) => prev.filter((comment) => comment.id !== deletingComment.id));
			toast.success("نظر با موفقیت حذف شد");
			setDeletingComment(null);
		} catch (error) {
			console.error("حذف نظر با خطا مواجه شد:", error);
			toast.error("حذف نظر با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="space-y-6">
			<PageHeader
				title="نظرات مشتریان"
				actionLabel="بروزرسانی"
				onAction={loadData}
			/>

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				<StatCard label="مجموع نظرات" value={comments.length} />
				<StatCard
					label="میانگین امتیاز"
					value={avgRating.toLocaleString("fa-IR", {
						maximumFractionDigits: 1,
					})}
					valueClassName="text-[#16A34A]"
				/>
				<StatCard
					label="امتیاز ۵ ستاره"
					value={fiveStarCount}
					valueClassName="text-[#B45309]"
				/>
				<StatCard
					label="امتیاز پایین (≤۲)"
					value={lowRatingCount}
					valueClassName="text-[#DC2626]"
				/>
			</div>

			<div className="bg-white rounded-2xl border border-[#EEF0F5] p-5 shadow-sm shadow-black/[0.02] space-y-5">
				<input
					type="text"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="جستجو در نام، متن نظر یا نام محصول..."
					className="w-full sm:w-80 rounded-xl border border-[#EEF0F5] px-4 py-2.5 text-sm outline-none focus:border-[#16A34A]"
				/>

				<div className="bg-white rounded-2xl border border-[#EEF0F5] overflow-x-auto">
					<table className="w-full min-w-[760px] text-sm">
						<thead>
							<tr className="text-[#9CA3AF] text-xs border-b border-[#EEF0F5]">
								<th className="text-right font-medium px-5 py-3">محصول</th>
								<th className="text-right font-medium px-5 py-3">نویسنده</th>
								<th className="text-right font-medium px-5 py-3">امتیاز</th>
								<th className="text-right font-medium px-5 py-3">متن نظر</th>
								<th className="text-right font-medium px-5 py-3">تاریخ</th>
								<th className="px-5 py-3"></th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td
										colSpan={6}
										className="text-center py-10 text-[#6B7280] text-sm"
									>
										در حال بارگذاری نظرات...
									</td>
								</tr>
							) : paginated.length === 0 ? (
								<tr>
									<td
										colSpan={6}
										className="text-center py-10 text-[#6B7280] text-sm"
									>
										<div className="flex flex-col items-center gap-2">
											<MessageSquare size={22} className="text-[#D1D5DB]" />
											نظری با این مشخصات پیدا نشد
										</div>
									</td>
								</tr>
							) : (
								paginated.map((comment) => (
									<tr
										key={comment.id}
										className="border-b border-[#EEF0F5] last:border-0 hover:bg-[#F7F8FC]/60 transition"
									>
										<td className="px-5 py-3 text-[#374151] font-medium whitespace-nowrap">
											{productNameMap.get(String(comment.productId)) || "—"}
										</td>
										<td className="px-5 py-3 text-[#374151] whitespace-nowrap">
											{comment.name}
										</td>
										<td className="px-5 py-3">
											<StarRating rating={Number(comment.rating || 0)} />
										</td>
										<td className="px-5 py-3 text-[#6B7280] max-w-[320px]">
											<span className="line-clamp-2">{comment.text}</span>
										</td>
										<td className="px-5 py-3 text-[#9CA3AF] whitespace-nowrap">
											{comment.date || "—"}
										</td>
										<td className="px-5 py-3">
											<button
												type="button"
												onClick={() => setDeletingComment(comment)}
												aria-label="حذف نظر"
												className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition"
											>
												<Trash2 size={16} />
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>

			<ConfirmDialog
				open={Boolean(deletingComment)}
				onClose={() => setDeletingComment(null)}
				onConfirm={handleDeleteComment}
				loading={deleting}
				title="حذف نظر"
				description={
					deletingComment
						? `آیا از حذف نظر «${deletingComment.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
						: ""
				}
			/>
		</div>
	);
}
