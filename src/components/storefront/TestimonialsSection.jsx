import { useEffect, useState } from "react";
import { getAllComments } from "../../services/comments";
import StarRating from "./StarRating";

export default function TestimonialsSection() {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let ignore = false;
		async function load() {
			setLoading(true);
			try {
				const data = await getAllComments();
				if (!ignore) setComments(data);
			} finally {
				if (!ignore) setLoading(false);
			}
		}
		load();
		return () => {
			ignore = true;
		};
	}, []);

	const featured = [...comments]
		.sort((firstComment, secondComment) => Number(secondComment.rating || 0) - Number(firstComment.rating || 0))
		.slice(0, 3);

	return (
		<section className="max-w-7xl mx-auto px-6 py-20">
			<div className="text-center mb-14">
				<h2 className="text-3xl font-extrabold text-forest mb-3">
					از زبان مشتریان
				</h2>
			</div>

			{loading ? (
				<p className="text-center text-ink/50">در حال بارگذاری نظرات...</p>
			) : featured.length === 0 ? (
				<p className="text-center text-ink/50">هنوز نظری ثبت نشده است.</p>
			) : (
				<div className="grid md:grid-cols-3 gap-8">
					{featured.map((comment) => (
						<div
							key={comment.id}
							className="bg-white rounded-3xl p-8 border border-ink/10"
						>
							<StarRating rating={Number(comment.rating || 0)} />
							<p className="text-ink/70 leading-8 my-6">«{comment.text}»</p>
							<p className="font-bold text-forest">{comment.name}</p>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
