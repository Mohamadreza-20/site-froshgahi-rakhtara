import HeroCopy from "./hero/HeroCopy";
import HeroProducts from "./hero/HeroProducts";
export default function Hero() {
 return <section className="relative overflow-hidden bg-forest" aria-labelledby="hero-title">
  <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs><pattern id="weave" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="46" stroke="#D4A94E" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#weave)" /></svg>
  <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-camel/20 blur-3xl" aria-hidden="true" />
  <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center"><HeroCopy /><HeroProducts /></div>
 </section>;
}
