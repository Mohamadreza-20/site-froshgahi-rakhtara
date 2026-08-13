import { useEffect, useMemo, useState } from "react";
import { Star, MessageCircle, ChevronDown, Loader2 } from "lucide-react";
import { getComments, createComment } from "../../services/comments";
import StarRating from "./StarRating";

const PAGE_SIZE = 5;

export default function ProductComments({ productId }) {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
	const [newCommentId, setNewCommentId] = useState(null);

	const [name, setName] = useState("");
	const [text, setText] = useState("");
	const [rating, setRating] = useState(5);
	const [hoverRating, setHoverRating] = useState(0);

	useEffect(() => {
		let ignore = false;
		async function load() {
			setLoading(true);
			try {
				const data = await getComments(productId);
				if (!ignore) setComments([...data].reverse());
			} finally {
				if (!ignore) setLoading(false);
			}
		}
		load();
		setVisibleCount(PAGE_SIZE);
		return () => {
			ignore = true;
		};
	}, [productId]);

	const avgRating = useMemo(
		() =>
			comments.length
				? comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0) /
					comments.length
				: 0,
		[comments],
	);

	const visibleComments = useMemo(
		() => comments.slice(0, visibleCount),
		[comments, visibleCount],
	);
	const hasMore = visibleCount < comments.length;
	const remaining = comments.length - visibleCount;

	async function handleSubmit(event) {
		event.preventDefault();
		if (!name.trim() || !text.trim()) return;

		setSubmitting(true);
		try {
			const newComment = await createComment({
				productId: String(productId),
				name: name.trim(),
				text: text.trim(),
				rating,
				date: new Date().toLocaleDateString("fa-IR"),
			});
			const updated = [newComment, ...comments];
			setComments(updated);
			setVisibleCount((prev) => prev + 1);
			setNewCommentId(newComment.id);
			setTimeout(
				() => setNewCommentId((currentId) => (currentId === newComment.id ? null : currentId)),
				1500,
			);
			setName("");
			setText("");
			setRating(5);
		} catch (error) {
			console.error("ثبت نظر با خطا مواجه شد:", error);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className="mb-20">
			<div className="flex items-center justify-between flex-wrap gap-3 mb-8">
				<h2 className="text-2xl font-extrabold text-forest flex items-center gap-2">
					<MessageCircle size={22} className="text-forest" />
					نظرات مشتریان
				</h2>
				{comments.length > 0 && (
					<div className="flex items-center gap-2">
						<StarRating rating={avgRating} />
						<span className="text-sm text-ink/60">
							({avgRating.toLocaleString("fa-IR", { maximumFractionDigits: 1 })}{" "}
							از {comments.length.toLocaleString("fa-IR")} نظر)
						</span>
					</div>
				)}
			</div>

			{loading ? (
				<p className="text-ink/50 mb-10">در حال بارگذاری نظرات...</p>
			) : comments.length === 0 ? (
				<p className="text-ink/50 mb-10">
					هنوز نظری برای این محصول ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
				</p>
			) : (
				<div className="space-y-5 mb-6">
					{visibleComments.map((comment) => (
						<div
							key={comment.id}
							className={`bg-white border rounded-2xl p-5 shadow-sm comment-in ${
								comment.id === newCommentId
									? "border-camel/60 comment-highlight"
									: "border-ink/10"
							}`}
						>
							<div className="flex items-center justify-between mb-2 flex-wrap gap-2">
								<span className="font-bold text-forest">{comment.name}</span>
								<div className="flex items-center gap-3">
									<StarRating rating={Number(comment.rating || 0)} />
									{comment.date && (
										<span className="text-xs text-ink/40">{comment.date}</span>
									)}
								</div>
							</div>
							<p className="text-ink/70 leading-7">{comment.text}</p>
						</div>
					))}
				</div>
			)}

			{hasMore && (
				<div className="flex justify-center mb-12">
					<button
						type="button"
						onClick={() =>
							setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, comments.length))
						}
						className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-forest border border-forest/25 bg-forest/5 hover:bg-forest/10 px-5 py-2.5 rounded-full transition-colors"
					>
						نمایش {Math.min(PAGE_SIZE, remaining).toLocaleString("fa-IR")} نظر دیگر
						<ChevronDown size={16} />
					</button>
				</div>
			)}
			{!hasMore && comments.length > PAGE_SIZE && (
				<div className="text-center mb-12">
					<span className="text-xs text-ink/40">همه نظرات نمایش داده شد</span>
				</div>
			)}

			<div className="bg-camel/10 border border-camel/20 rounded-2xl p-6">
				<h3 className="font-bold text-forest mb-4">ثبت نظر جدید</h3>
				<form onSubmit={handleSubmit} className="space-y-4">
					<fieldset disabled={submitting} className="space-y-4 disabled:opacity-60">
					<div className="grid sm:grid-cols-2 gap-4">
						<input
							type="text"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="نام شما"
							required
							className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest"
						/>
						<div className="flex items-center gap-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									type="button"
									key={star}
									onClick={() => setRating(star)}
									onMouseEnter={() => setHoverRating(star)}
									onMouseLeave={() => setHoverRating(0)}
									aria-label={`امتیاز ${star}`}
									className="cursor-pointer"
								>
									<Star
										size={22}
										className="text-camel"
										fill={
											star <= (hoverRating || rating) ? "#D4A94E" : "none"
										}
									/>
								</button>
							))}
						</div>
					</div>
					<textarea
						value={text}
						onChange={(event) => setText(event.target.value)}
						placeholder="نظر خود را درباره این محصول بنویسید..."
						required
						rows={3}
						className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest resize-none"
					/>
					<button
						type="submit"
						disabled={submitting}
						className="cursor-pointer flex items-center gap-2 bg-forest text-cream font-bold px-6 py-2.5 rounded-full hover:bg-forest-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{submitting && <Loader2 size={16} className="animate-spin" />}
						{submitting ? "در حال ارسال..." : "ثبت نظر"}
					</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}

