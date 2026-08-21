import { LoaderCircle, PackageSearch, RefreshCw } from "lucide-react";

export function QueryErrorState({ message = "دریافت اطلاعات ناموفق بود", onRetry }) {
  return (
    <div className="py-16 text-center" role="alert" aria-live="assertive">
      <p className="text-rust font-bold mb-3">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest text-cream font-bold hover:bg-forest-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
        >
          <RefreshCw size={15} aria-hidden="true" />
          تلاش مجدد
        </button>
      )}
    </div>
  );
}

export function QueryLoadingState({ message = "در حال بارگذاری...", skeleton = false }) {
  if (skeleton) {
    return (
      <div className="py-8 space-y-3" role="status" aria-live="polite" aria-label={message}>
        <span className="sr-only">{message}</span>
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-12 rounded-xl bg-ink/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="py-16 flex flex-col items-center justify-center gap-3 text-sm text-ink/50" role="status" aria-live="polite">
      <LoaderCircle size={20} className="animate-spin text-forest" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export function EmptyState({ title = "اطلاعاتی یافت نشد", description, action }) {
  return (
    <div className="py-16 text-center">
      <PackageSearch className="mx-auto mb-4 text-ink/20" size={46} aria-hidden="true" />
      <p className="text-lg text-ink/60 mb-2">{title}</p>
      {description && <p className="text-sm text-ink/40 mb-5">{description}</p>}
      {action}
    </div>
  );
}
