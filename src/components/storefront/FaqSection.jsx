import { ChevronDown } from "lucide-react";
import { FAQS } from "../../lib/data/products";

export default function FaqSection({ openFaq, setOpenFaq }) {
	return (
		<section className="max-w-4xl mx-auto px-6 py-20">
			<div className="text-center mb-14">
				<h2 className="text-3xl font-extrabold text-forest mb-3">
					سوالات متداول
				</h2>
			</div>
			<div className="space-y-4">
				{FAQS.map((faq, index) => (
					<div
						key={faq.q}
						className="bg-white rounded-2xl border border-ink/10 p-6"
					>
						<button
							onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
							className="cursor-pointer w-full flex items-center justify-between text-right font-bold text-forest"
						>
							{faq.q}
							<ChevronDown
								size={20}
								className={`transition-transform ${openFaq === index ? "rotate-180" : ""}`}
							/>
						</button>
						{openFaq === index && (
							<p className="mt-4 leading-7 text-ink/60">{faq.a}</p>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
