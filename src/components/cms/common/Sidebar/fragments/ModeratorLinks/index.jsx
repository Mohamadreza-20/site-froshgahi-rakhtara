import NavItem from "../NavItem";
import { House, Package, MessageSquare, Users } from "lucide-react";
function ModeratorLinks({ onNavigate }) {
	return (
		<>
			<NavItem
				icon={<House size={17} aria-hidden="true" />}
				iconColor="text-zinc-500"
				bgColor="bg-zinc-500"
				href="/dashboard/home"
				label="پیشخوان"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<Package size={17} aria-hidden="true" />}
				iconColor="text-yellow-500"
				bgColor="bg-yellow-500"
				href="/dashboard/products"
				label="محصولات"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<Users size={17} aria-hidden="true" />}
				iconColor="text-orange-500"
				bgColor="bg-orange-500"
				href="/dashboard/users"
				label="کاربران"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<MessageSquare size={17} aria-hidden="true" />}
				iconColor="text-purple-500"
				bgColor="bg-purple-500"
				href="/dashboard/comments"
				label="نظرات"
				onClick={onNavigate}
			/>
		</>
	);
}

export default ModeratorLinks;
