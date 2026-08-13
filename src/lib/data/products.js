export const CATEGORIES = [
	{ id: "women", name: "پوشاک زنانه", emoji: "👗", bg: "bg-rust" },
	{ id: "men", name: "پوشاک مردانه", emoji: "👔", bg: "bg-forest-light" },
	{ id: "shoes", name: "کیف و کفش", emoji: "👜", bg: "bg-camel-dark" },
	{ id: "accessory", name: "اکسسوری", emoji: "🕶️", bg: "bg-ink" },
];

export const CATEGORY_STYLES = {
	"پوشاک زنانه": { bg: "bg-[#FDF2FA]", text: "text-[#C026D3]" },
	"پوشاک مردانه": { bg: "bg-[#EEF2FF]", text: "text-[#4F46E5]" },
	"کیف و کفش": { bg: "bg-[#FFF7ED]", text: "text-[#EA580C]" },
	"اکسسوری": { bg: "bg-[#FFFBEB]", text: "text-[#B45309]" },
};

export const FAQS = [
	{
		q: "زمان ارسال سفارش چقدر است؟",
		a: "سفارش‌های تهران طی ۲۴ ساعت و سایر شهرها طی ۲ تا ۴ روز کاری تحویل داده می‌شود.",
	},
	{
		q: "امکان تعویض سایز وجود دارد؟",
		a: "بله، تا ۷ روز پس از دریافت کالا امکان تعویض سایز رایگان (در صورت سالم بودن کالا) وجود دارد.",
	},
	{
		q: "جنس محصولات چگونه تضمین می‌شود؟",
		a: "تمام محصولات پیش از ارسال از نظر کیفیت پارچه و دوخت بررسی می‌شوند و گارانتی اصالت جنس دارند.",
	},
	{
		q: "روش‌های پرداخت چیست؟",
		a: "پرداخت آنلاین از طریق درگاه بانکی و همچنین پرداخت در محل برای سفارش‌های تهران امکان‌پذیر است.",
	},
];

export const NAV_LINKS = [
	{ href: "products", label: "محصولات" },
	{ href: "#categories", label: "دسته‌بندی‌ها" },
	{ href: "#story", label: "داستان برند" },
	{ href: "#reviews", label: "نظرات" },
	{ href: "#faq", label: "سوالات متداول" },
	{ href: "about-us", label: "درباره ما" },
	{ href: "contact-us", label: "تماس با ما" },
];

export function toman(n) {
	return Number(n || 0).toLocaleString("fa-IR") + " تومان";
}
