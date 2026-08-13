import { CATEGORY_STYLES } from "../../../lib/data/products";

export default function CategoryBadge({ category }) {
	const style = CATEGORY_STYLES[category] || {
		bg: "bg-gray-100",
		text: "text-gray-600",
	};
	return (
		<span
			className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${style.bg} ${style.text}`}
		>
			{category}
		</span>
	);
}
