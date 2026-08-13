import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { StatusPill, RoleBadge } from "../../ui";
import { getUsers } from "../../../../services/users";
import { useNavigate } from "react-router-dom";
import { getAvatarUrl } from "../../../../utils/avatar";

export default function RecentUsers() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function getData() {
			const data = await getUsers();
			setUsers(data);
		}
		getData();
	}, []);

	const recentUsers = [...users]
		.sort((firstUser, secondUser) => secondUser.id - firstUser.id)
		.slice(0, 5);
	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-5">
				<button
					onClick={() => navigate("/dashboard/users")}
					className="cursor-pointer flex items-center gap-1 text-xs font-medium text-[#6C63FF] hover:text-[#4F46E5] transition"
				>
					مشاهده همه <ArrowLeft size={13} />
				</button>
				<h3 className="font-bold text-[#111827]">۵ کاربر آخر</h3>
			</div>
			<div className="flex flex-col divide-y divide-[#F5F6FA]">
				{recentUsers.map((user) => (
					<div
						key={user.id || user.email}
						className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
					>
						<div className="text-left">
							<StatusPill status={user.status} />
							<div className="text-xs text-[#9CA3AF] mt-1 tabular-nums">
								{user.joined}
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="text-right">
								<div className="text-sm font-medium text-[#111827]">
									{user.name}
								</div>
								<RoleBadge role={user.role} />
							</div>
							<img
								src={getAvatarUrl(user.seed || user.name)}
								alt=""
								className="w-10 h-10 rounded-full bg-[#EEF0FF] shrink-0"
							/>
						</div>
					</div>
				))}
				{recentUsers.length === 0 && (
					<div className="text-center py-6 text-sm text-[#9CA3AF]">
						کاربری یافت نشد
					</div>
				)}
			</div>
		</div>
	);
}
