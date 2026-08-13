export default function ProductDetailSkeleton() {
	return (
		<div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
			<div className="h-4 w-40 bg-ink/10 rounded mb-8" />

			<div className="grid md:grid-cols-2 gap-12 mb-20">
				<div className="rounded-[2rem] bg-ink/10 h-[380px] md:h-[440px]" />

				<div>
					<div className="h-5 w-24 bg-ink/10 rounded-full mb-4" />
					<div className="h-9 w-3/4 bg-ink/10 rounded mb-4" />
					<div className="h-4 w-full bg-ink/10 rounded mb-2" />
					<div className="h-4 w-5/6 bg-ink/10 rounded mb-8" />
					<div className="h-8 w-32 bg-ink/10 rounded mb-8" />
					<div className="flex items-center gap-4 mb-8">
						<div className="h-12 w-28 bg-ink/10 rounded-full" />
						<div className="h-12 flex-1 bg-ink/10 rounded-full" />
					</div>
					<div className="grid grid-cols-3 gap-4 pt-6 border-t border-ink/10">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="h-10 bg-ink/10 rounded mx-auto w-16" />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
