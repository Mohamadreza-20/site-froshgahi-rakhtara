import { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";
import { ChartTooltip } from "../../ui";
import { getUsers } from "../../../../services/users";
import { getProduct } from "../../../../services/products";

export default function RegistrationsChart() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
			try {
				const [users, products] = await Promise.all([
					getUsers(),
					getProduct(),
				]);

				const customerCount = users.filter((currentUser) => currentUser.role === "مشتری").length;
				const supportCount = users.filter(
					(currentUser) => currentUser.role === "پشتیبانی",
				).length;
				const managerCount = users.filter(
					(currentUser) => currentUser.role === "مدیر فروشگاه",
				).length;

				setData([
					{ label: "مشتری", value: customerCount },
					{ label: "پشتیبانی", value: supportCount },
					{ label: "مدیر فروشگاه", value: managerCount },
					{ label: "محصولات", value: products.length },
				]);
			} finally {
				setLoading(false);
			}
		}
		getData();
	}, []);

	return (
		<div className="bg-white rounded-2xl border border-[#EEF0F5] p-6 shadow-sm shadow-black/[0.02]">
			<div className="flex items-center justify-between mb-6">
				<span className="text-sm text-[#6B7280] font-medium">
					کاربران ثبت‌نامی و محصولات
				</span>
				<h3 className="font-bold text-lg text-[#111827]">آمار کلی داشبورد</h3>
			</div>
			<div className="h-72 w-full" dir="ltr">
				{loading ? (
					<div className="h-full w-full flex items-center justify-center text-sm text-[#9CA3AF]">
						در حال بارگذاری…
					</div>
				) : (
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={data}
							margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
							barCategoryGap="35%"
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#F1F2F6"
								vertical={false}
							/>
							<XAxis
								dataKey="label"
								reversed
								tick={{ fill: "#9CA3AF", fontSize: 12 }}
								axisLine={{ stroke: "#EEF0F5" }}
								tickLine={false}
							/>
							<YAxis
								tick={{ fill: "#9CA3AF", fontSize: 12 }}
								axisLine={false}
								tickLine={false}
								allowDecimals={false}
							/>
							<Tooltip
								cursor={{ fill: "#F7F8FB" }}
								content={<ChartTooltip />}
							/>
							<Bar
								dataKey="value"
								fill="#6C63FF"
								radius={[8, 8, 0, 0]}
								maxBarSize={64}
							/>
						</BarChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	);
}
