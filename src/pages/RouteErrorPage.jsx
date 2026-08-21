import { isRouteErrorResponse, useLocation, useNavigate, useRouteError } from "react-router-dom";
import { Home, RefreshCw, TriangleAlert } from "lucide-react";

export default function RouteErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const title = isNotFound ? "صفحه پیدا نشد" : "مشکلی در نمایش این صفحه پیش آمد";
  const description = isNotFound
    ? "صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است."
    : "یک خطای غیرمنتظره رخ داد. می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید.";
  const errorId = `${location.pathname}${location.search}`;

  return (
    <main dir="rtl" className="min-h-screen grid place-items-center bg-[#FAF8F3] px-6 py-12">
      <section className="w-full max-w-lg rounded-3xl bg-white border border-black/5 shadow-sm p-8 text-center" aria-labelledby="route-error-title">
        <div className="mx-auto mb-5 size-14 rounded-2xl bg-amber-50 text-amber-700 grid place-items-center" aria-hidden="true">
          {isNotFound ? <Home size={26} /> : <TriangleAlert size={26} />}
        </div>
        <h1 id="route-error-title" className="text-2xl font-extrabold text-ink mb-3">{title}</h1>
        <p className="text-sm leading-7 text-ink/60 mb-2">{description}</p>
        {!isNotFound && <p className="text-[11px] text-ink/30 mb-6 break-all" aria-label="شناسه خطا">شناسه: {errorId}</p>}
        {isNotFound && <div className="mb-6" />}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {!isNotFound && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-xl bg-forest text-white px-5 py-2.5 font-bold hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
            >
              <RefreshCw size={16} aria-hidden="true" />
              تلاش مجدد
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-white text-forest px-5 py-2.5 font-bold hover:bg-ink/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"
          >
            <Home size={16} aria-hidden="true" />
            صفحه اصلی
          </button>
        </div>
      </section>
    </main>
  );
}
