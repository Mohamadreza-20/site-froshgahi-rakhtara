import { Search } from "lucide-react";
import UserRow from "./UserRow";
import { Pagination } from "../../ui";

export default function UsersTable({
	users,
	totalCount,
	query,
	onQueryChange,
	onEdit,
	onDelete,
	newUserId,
	currentPage,
	totalPages,
	onPageChange,
}) {
	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] overflow-hidden shadow-sm shadow-black/[0.02]">
			<div className="p-5 flex items-center justify-between border-b border-[#EEF0F5]">
				<div className="relative">
					<Search
						size={16}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
					/>
					<input
						value={query}
						onChange={(event) => onQueryChange(event.target.value)}
						placeholder="جستجوی کاربر..."
						className="pr-9 pl-3 py-2 rounded-lg border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition w-56 bg-[#FAFAFC]"
					/>
				</div>
				<p className="text-sm text-[#6B7280]">{totalCount ?? users.length} کاربر</p>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-[#9CA3AF] text-xs border-b border-[#EEF0F5]">
							<th className="text-right font-medium px-5 py-3">نام</th>
							<th className="text-right font-medium px-5 py-3">ایمیل</th>
							<th className="text-right font-medium px-5 py-3">موبایل</th>
							<th className="text-right font-medium px-5 py-3">نقش</th>
							<th className="text-right font-medium px-5 py-3">تاریخ عضویت</th>
							<th className="text-right font-medium px-5 py-3">وضعیت</th>
							<th className="px-5 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<UserRow
								key={user.id ?? user.email}
								user={user}
								onEdit={onEdit}
								onDelete={onDelete}
								isNew={newUserId != null && user.id === newUserId}
							/>
						))}
						{users.length === 0 && (
							<tr>
								<td
									colSpan={7}
									className="text-center py-10 text-[#6B7280] text-sm"
								>
									کاربری با این مشخصات پیدا نشد
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{totalPages > 1 && (
				<div className="p-5 border-t border-[#EEF0F5]">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</div>
	);
}
