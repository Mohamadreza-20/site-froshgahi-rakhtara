import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AboutHero from "../components/storefront/about/AboutHero";
import AboutValues from "../components/storefront/about/AboutValues";
import AboutTimeline from "../components/storefront/about/AboutTimeline";
import AboutTeam from "../components/storefront/about/AboutTeam";
import { STATS } from "../components/storefront/about/about.data";
import { usePageMeta } from "../lib/hooks/usePageMeta";

export default function AboutUsPage() {
	usePageMeta({ title: "درباره ما | Rakhtara", description: "با داستان، ارزش‌ها و تیم Rakhtara آشنا شوید.", path: "/about-us" });
	return <div><div className="max-w-7xl mx-auto px-6 pt-10"><div className="flex items-center gap-2 text-sm mb-8 text-ink/50"><Link to="/" className="hover:underline text-forest">خانه</Link><ChevronLeft size={14} aria-hidden="true" /><span>درباره ما</span></div></div><AboutHero /><section className="border-y border-ink/10 bg-white"><div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">{STATS.map((stat)=><div key={stat.label}><p className="text-2xl md:text-3xl font-extrabold text-forest mb-1">{stat.value}</p><p className="text-sm text-ink/50">{stat.label}</p></div>)}</div></section><AboutValues /><AboutTimeline /><AboutTeam /></div>;
}
