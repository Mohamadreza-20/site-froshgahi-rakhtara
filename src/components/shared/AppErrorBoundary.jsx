import { ErrorBoundary } from "react-error-boundary";

function Fallback({ resetErrorBoundary }) {
	return (
		<main dir="rtl" className="min-h-screen grid place-items-center bg-[#FAF8F3] px-6">
			<section className="w-full max-w-lg rounded-3xl bg-white border border-black/5 shadow-sm p-8 text-center">
				<div className="mx-auto mb-5 size-14 rounded-2xl bg-red-50 text-red-600 grid place-items-center text-xl font-extrabold">!</div>
				<h1 className="text-2xl font-extrabold text-ink mb-3">یک خطای غیرمنتظره رخ داد</h1>
				<p className="text-sm leading-7 text-ink/60 mb-6">صفحه فعلی نتوانست به درستی نمایش داده شود. می‌توانید دوباره تلاش کنید.</p>
				<button
				type="button"
				onClick={resetErrorBoundary}
				className="rounded-xl bg-forest text-white px-5 py-2.5 font-bold hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
			>
					تلاش مجدد
				</button>
			</section>
		</main>
	);
}

export default function AppErrorBoundary({ children }) {
	return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
