import { roleStyle } from "../../../lib/data/mockData";

export default function RoleBadge({ role }) {
	const style = roleStyle[role] || { bg: "bg-gray-100", text: "text-gray-600" };
	return (
		<span
			className={`px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
		>
			{role}
		</span>
	);
}
