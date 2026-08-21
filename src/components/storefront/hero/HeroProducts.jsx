import { ShieldCheck } from "lucide-react";
import { toman } from "../../../lib/data/products";
import OptimizedImage from "../../shared/OptimizedImage";
const HERO_PRODUCTS = [
 { name:"پیراهن کتان مردانه", price:890000, image:"/images/product-1.svg" },
 { name:"کیف دستی چرم زنانه", price:1450000, image:"/images/product-2.svg" },
];
export default function HeroProducts() {
 return <div className="relative hidden md:block h-[460px]">
  <div className="absolute top-2 right-6 w-[380px] h-[380px] rounded-full bg-gradient-to-br from-camel via-camel-dark to-rust opacity-90" aria-hidden="true" />
  <div className="absolute top-6 right-16 w-56 rounded-[1.5rem] bg-cream p-3 shadow-2xl shadow-black/30 rotate-[-4deg] hover:rotate-0 transition-transform duration-500"><div className="aspect-square rounded-2xl overflow-hidden bg-forest-dark"><OptimizedImage src={HERO_PRODUCTS[0].image} alt={HERO_PRODUCTS[0].name} width={420} height={420} priority className="w-full h-full object-cover" /></div><div className="pt-3 pb-1 px-1 text-right"><p className="text-sm font-bold text-ink">{HERO_PRODUCTS[0].name}</p><p className="text-xs text-forest font-semibold mt-1">{toman(HERO_PRODUCTS[0].price)}</p></div></div>
  <div className="absolute bottom-2 left-0 w-48 rounded-[1.5rem] bg-cream p-3 shadow-2xl shadow-black/30 rotate-[5deg] hover:rotate-0 transition-transform duration-500"><div className="aspect-[4/3] rounded-2xl overflow-hidden bg-rust/80"><OptimizedImage src={HERO_PRODUCTS[1].image} alt={HERO_PRODUCTS[1].name} width={420} height={315} className="w-full h-full object-cover" /></div><div className="pt-3 pb-1 px-1 text-right"><p className="text-sm font-bold text-ink">{HERO_PRODUCTS[1].name}</p><p className="text-xs text-forest font-semibold mt-1">{toman(HERO_PRODUCTS[1].price)}</p></div></div>
  <div className="absolute -bottom-4 right-24 flex items-center gap-2.5 bg-white rounded-full pl-5 pr-4 py-3 shadow-xl shadow-black/20"><ShieldCheck size={18} className="text-forest shrink-0" aria-hidden="true" /><span className="text-xs font-bold text-ink whitespace-nowrap">۱۰۰٪ ضمانت اصالت</span></div>
 </div>;
}
