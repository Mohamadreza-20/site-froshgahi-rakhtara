import OptimizedImage from "../../../shared/OptimizedImage";
import { Pencil, Trash2 } from "lucide-react";
import { RoleBadge, StatusPill } from "../../ui";
import ActionsMenu from "../products/ActionsMenu";
import { getAvatarUrl } from "../../../../utils/avatar";

export default function UserRow({ user, onEdit, onDelete, isNew }) {
	return (
		<tr
			className={`border-b border-[#F5F6FA] last:border-0 hover:bg-[#FAFAFC] transition ${
				isNew ? "product-row-enter" : ""
			}`}
		>
			<td className="px-5 py-3.5">
				<div className="flex items-center gap-3">
					<OptimizedImage
						src={getAvatarUrl(user.seed || user.name)}
						alt=""
						className="w-9 h-9 rounded-full bg-[#EEF0FF] ring-2 ring-[#F5F6FA]"
					/>
					<span className="font-medium text-[#111827]">{user.name}</span>
				</div>
			</td>
			<td
				className="px-5 py-3.5 text-[#6B7280]"
				dir="ltr"
				style={{ textAlign: "right" }}
			>
				{user.email}
			</td>
			<td
				className="px-5 py-3.5 text-[#6B7280] tabular-nums"
				dir="ltr"
				style={{ textAlign: "right" }}
			>
				{user.phone || "—"}
			</td>
			<td className="px-5 py-3.5">
				<RoleBadge role={user.role} />
			</td>
			<td className="px-5 py-3.5 text-[#6B7280] tabular-nums">{user.joined}</td>
			<td className="px-5 py-3.5">
				<StatusPill status={user.status} />
			</td>
			<td className="px-5 py-3.5 text-left">
				<ActionsMenu
					items={[
						{ label: "ویرایش", icon: Pencil, onClick: () => onEdit?.(user) },
						{
							label: "حذف",
							icon: Trash2,
							danger: true,
							onClick: () => onDelete?.(user),
						},
					]}
				/>
			</td>
		</tr>
	);
}
