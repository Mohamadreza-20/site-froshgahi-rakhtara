import { Users, ShoppingBag, Ticket, UserCog } from "lucide-react";

export const statCardIcons = {
  managers: UserCog,
  tickets: Ticket,
  users: Users,
  products: ShoppingBag,
};

export const roleStyle = {
  "مشتری": { bg: "bg-[#EEF2FF]", text: "text-[#4F46E5]" },
  "مدیر فروشگاه": { bg: "bg-[#FDF2FA]", text: "text-[#C026D3]" },
  "پشتیبانی": { bg: "bg-[#FFF7ED]", text: "text-[#EA580C]" },
};
