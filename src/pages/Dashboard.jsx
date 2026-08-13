import { useEffect, useState } from "react";
import { PageHeader, StatCard } from "../components/cms/ui";
import RegistrationsChart from "../components/cms/features/dashboard/RegistrationsChart";
import RecentProducts from "../components/cms/features/dashboard/RecentProducts";
import RecentUsers from "../components/cms/features/dashboard/RecentUsers";
import ShowcaseImagesManager from "../components/cms/features/dashboard/ShowcaseImagesManager";
import ContactInfoSection from "../components/cms/features/dashboard/ContactInfoSection";
import ContactMessagesSection from "../components/cms/features/dashboard/ContactMessagesSection";
import { statCardIcons } from "../lib/data/mockData";
import { getProduct } from "../services/products";
import { getUsers } from "../services/users";
import { getAllComments } from "../services/comments";
import { PANEL_ROLES } from "../lib/roles";

export default function Dashboard() {
	const [counts, setCounts] = useState({
		managers: 0,
		comments: 0,
		users: 0,
		products: 0,
	});

	useEffect(() => {
		async function getData() {
			const [products, users, comments] = await Promise.all([
				getProduct(),
				getUsers(),
				getAllComments(),
			]);

			setCounts({
				managers: users.filter((currentUser) => PANEL_ROLES.includes(currentUser.role)).length,
				comments: comments.length,
				users: users.length,
				products: products.length,
			});
		}
		getData();
	}, []);

	const statCards = [
		{
			label: "تعداد مدیران",
			value: counts.managers.toLocaleString("fa-IR"),
			suffix: "عدد",
			icon: statCardIcons.managers,
		},
		{
			label: "تعداد تیکت‌ها",
			value: counts.comments.toLocaleString("fa-IR"),
			suffix: "عدد",
			icon: statCardIcons.tickets,
		},
		{
			label: "تعداد کاربران",
			value: counts.users.toLocaleString("fa-IR"),
			suffix: "عدد",
			icon: statCardIcons.users,
		},
		{
			label: "تعداد محصولات",
			value: counts.products.toLocaleString("fa-IR"),
			suffix: "عدد",
			icon: statCardIcons.products,
		},
	];

	return (
		<div className="space-y-6 ">
			<PageHeader title="داشبورد" />

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				{statCards.map((statCard) => (
					<StatCard
						key={statCard.label}
						label={statCard.label}
						value={statCard.value}
						suffix={statCard.suffix}
						icon={statCard.icon}
					/>
				))}
			</div>

			<RegistrationsChart />

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<RecentProducts />
				<RecentUsers />
			</div>

			<ShowcaseImagesManager />

			<ContactInfoSection />

			<ContactMessagesSection />
		</div>
	);
}
