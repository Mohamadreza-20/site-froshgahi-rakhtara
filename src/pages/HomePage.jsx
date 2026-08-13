import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TrustBadges from "../components/storefront/TrustBadges";
import Categories from "../components/storefront/Categories";
import Hero from "../components/storefront/Hero";
import ImageShowcase from "../components/storefront/ImageShowcase";
import ProductsSection from "../components/storefront/ProductsSection";
import LazyMount from "../components/shared/LazyMount";
import StorySection from "../components/storefront/StorySection";
import TestimonialsSection from "../components/storefront/TestimonialsSection";
import FaqSection from "../components/storefront/FaqSection";
import Newsletter from "../components/storefront/Newsletter";

export default function HomePage() {
	const { addToCart } = useOutletContext();
	const [openFaq, setOpenFaq] = useState(0);

	return (
		<>
			<Hero />
			<ImageShowcase />
			<TrustBadges />
			<Categories />
			<div className="thread-divider max-w-7xl mx-auto" />
			<ProductsSection onAdd={addToCart} />

			<LazyMount id="story" minHeight={520}>
				<StorySection />
			</LazyMount>

			<LazyMount id="reviews" minHeight={480}>
				<TestimonialsSection />
			</LazyMount>

			<LazyMount id="faq" minHeight={520}>
				<FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
			</LazyMount>

			<LazyMount minHeight={280}>
				<Newsletter />
			</LazyMount>
		</>
	);
}
