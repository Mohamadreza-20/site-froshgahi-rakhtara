import NavItem from "../NavItem";
import { BiHome } from "react-icons/bi";
import { BsBox2, BsChatSquareText } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
function ModeratorLinks({ onNavigate }) {
	return (
		<>
			<NavItem
				icon={<BiHome />}
				iconColor="text-zinc-500"
				bgColor="bg-zinc-500"
				href="/dashboard/home"
				label="پیشخوان"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<BsBox2 />}
				iconColor="text-yellow-500"
				bgColor="bg-yellow-500"
				href="/dashboard/products"
				label="محصولات"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<FaUsers />}
				iconColor="text-orange-500"
				bgColor="bg-orange-500"
				href="/dashboard/users"
				label="کاربران"
				onClick={onNavigate}
			/>
			<NavItem
				icon={<BsChatSquareText />}
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
