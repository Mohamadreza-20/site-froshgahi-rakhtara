export default function ProductCardSkeleton() {
	return (
		<div className="bg-white rounded-3xl overflow-hidden border border-ink/10 animate-pulse">
			<div className="aspect-[4/3] bg-ink/10" />
			<div className="p-6">
				<div className="h-4 w-16 bg-ink/10 rounded-full mb-4" />
				<div className="h-5 w-3/4 bg-ink/10 rounded mb-3" />
				<div className="flex items-center justify-between">
					<div className="h-4 w-20 bg-ink/10 rounded" />
					<div className="h-8 w-20 bg-ink/10 rounded-full" />
				</div>
			</div>
		</div>
	);
}

export function ProductGridSkeleton({ count = 6 }) {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{Array.from({ length: count }).map((_, i) => (
				<ProductCardSkeleton key={i} />
			))}
		</div>
	);
}
