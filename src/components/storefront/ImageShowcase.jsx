import OptimizedImage from "../shared/OptimizedImage";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useShowcaseQuery } from "../../lib/hooks/cms/useShowcaseQueries";
import "swiper/css";
import "swiper/css/pagination";
import "./ImageShowcase.css";

const FALLBACK_IMAGES = [
	{
		id: "fallback-1",
		src: "/images/showcase-fashion.svg",
		alt: "پوشاک رخت‌آرا",
	},
	{
		id: "fallback-2",
		src: "/images/showcase-bag.svg",
		alt: "کیف چرم",
	},
	{
		id: "fallback-3",
		src: "/images/showcase-glasses.svg",
		alt: "عینک آفتابی",
	},
];

export default function ImageShowcase() {
  const swiperRef = useRef(null);
  const { data, isLoading, isError } = useShowcaseQuery();
  const images = !isLoading && !isError && data?.length ? data : FALLBACK_IMAGES;
  return (
    <section className="py-16 bg-camel">
      <div className="max-w-4xl mx-auto px-6"><div className="relative"><Swiper modules={[Pagination, Autoplay]} keyboard={{ enabled: true }} a11y={{ enabled: true }} dir="rtl" loop={images.length > 1} autoplay={{ delay: 3500, disableOnInteraction: false }} pagination={{ clickable: true }} onSwiper={(swiper) => (swiperRef.current = swiper)} className="showcase-swiper w-full h-[280px] md:h-[420px] rounded-[2rem] shadow-2xl overflow-hidden">{images.map((image, index) => <SwiperSlide key={image.id ?? image.src}><OptimizedImage src={image.src} alt={image.alt || ""} width={1280} height={720} priority={index === 0} sizes="(max-width: 768px) 100vw, 1024px" className="w-full h-full object-cover" /></SwiperSlide>)}</Swiper>{images.length > 1 && <><button type="button" onClick={() => swiperRef.current?.slidePrev()} aria-label="عکس قبلی" className="showcase-nav-btn cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 z-20 w-11 h-11 rounded-full bg-forest-dark/80 hover:bg-forest-dark text-camel flex items-center justify-center shadow-lg backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel/50"><ChevronRight size={20} aria-hidden="true" /></button><button type="button" onClick={() => swiperRef.current?.slideNext()} aria-label="عکس بعدی" className="showcase-nav-btn cursor-pointer absolute top-1/2 -translate-y-1/2 left-3 z-20 w-11 h-11 rounded-full bg-forest-dark/80 hover:bg-forest-dark text-camel flex items-center justify-center shadow-lg backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel/50"><ChevronLeft size={20} aria-hidden="true" /></button></>}</div></div>
    </section>
  );
}
