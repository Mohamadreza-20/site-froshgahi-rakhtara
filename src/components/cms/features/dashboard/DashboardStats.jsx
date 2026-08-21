import { StatCard } from "../../ui";

export default function DashboardStats({ counts, icons }) {
  const cards = [
    { label: "کل کاربران", value: counts.users, icon: icons.users },
    { label: "محصولات", value: counts.products, icon: icons.products },
    { label: "مدیران فروشگاه", value: counts.managers, icon: icons.managers },
    { label: "نظرات", value: counts.comments, icon: icons.tickets },
  ];

  return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{cards.map((card) => <StatCard key={card.label} {...card} />)}</div>;
}
