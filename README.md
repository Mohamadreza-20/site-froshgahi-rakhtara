# Rakhtara | فروشگاه اینترنتی پوشاک

Rakhtara یک فروشگاه اینترنتی فارسی و راست‌چین است که با React و Vite ساخته شده و هم تجربه خرید کاربران و هم یک پنل مدیریت کامل را در اختیار می‌گذارد.

این پروژه با هدف نمایش توانایی‌های توسعه Frontend، طراحی رابط کاربری، مدیریت state و data fetching، کار با فرم‌ها، دسترسی‌پذیری، بهینه‌سازی تصاویر و آماده‌سازی یک پروژه واقعی برای انتشار در GitHub ساخته شده است.

> **نوع پروژه:** Frontend Portfolio / Demo
>
> **API:** JSON Server به‌عنوان سرویس داده شبیه‌سازی‌شده
>
> **احراز هویت:** Demo client-side و مناسب محیط نمونه‌کار، نه استفاده واقعی در Production

---

## امکانات

### فروشگاه

- نمایش محصولات و دسته‌بندی‌ها
- فیلتر، مرتب‌سازی و صفحه‌بندی
- صفحه جزئیات محصول
- انتخاب سایز و مدیریت موجودی
- سبد خرید مهمان و کاربر
- ادغام سبد مهمان با سبد حساب کاربری پس از ورود
- به‌روزرسانی فوری سبد خرید با rollback در خطای درخواست
- ثبت و نمایش نظرات
- فرم تماس و خبرنامه
- حساب کاربری و مدیریت اطلاعات پروفایل

### پنل مدیریت

- داشبورد آماری
- مدیریت محصولات و عملیات CRUD
- مدیریت کاربران
- مدیریت نظرات
- مدیریت پیام‌های تماس
- مدیریت تصاویر Showcase
- نمایش محصولات در حالت Grid و Table
- جست‌وجو، فیلتر و صفحه‌بندی داده‌ها

### کیفیت فنی

- React 19
- React Router
- TanStack Query
- Zod
- Axios
- Tailwind CSS
- Error Boundary
- Lazy Loading و Route Code Splitting
- مدیریت متمرکز metadata و SEO
- prerender محتوای SEO در زمان build
- Sitemap و Robots
- تصاویر WebP و AVIF با `srcset` واکنش‌گرا
- طراحی RTL و Responsive
- Focus Management و keyboard navigation
- کنترل‌های مهم با ARIA

---

## تکنولوژی‌ها

| بخش | فناوری |
|---|---|
| رابط کاربری | React |
| Build Tool | Vite |
| Routing | React Router |
| مدیریت داده | TanStack Query |
| HTTP Client | Axios |
| اعتبارسنجی | Zod |
| Styling | Tailwind CSS |
| اعلان‌ها | Sonner |
| نمودارها | Recharts |
| اسلایدر | Swiper |
| آیکون‌ها | Lucide React |
| API Demo | JSON Server |

---

## ساختار پروژه

```text
src/
├── components/
│   ├── auth/
│   ├── cms/
│   ├── layouts/
│   ├── shared/
│   └── storefront/
├── context/
├── lib/
│   ├── data/
│   ├── hooks/
│   ├── queryClient.js
│   ├── config.js
│   └── routes.jsx
├── pages/
├── services/
└── utils/

scripts/
├── sync-seo-manifest.mjs
├── generate-seo.mjs
└── build-production.mjs

server-data/
└── db.json
```

معماری پروژه بر پایه جداسازی مسئولیت‌ها شکل گرفته است. صفحات بیشتر وظیفه composition دارند و منطق مربوط به API، mutation، state و domain behavior در serviceها و hookهای تخصصی قرار گرفته است.

---

## مدیریت داده

TanStack Query برای دریافت، cache، deduplication و invalidation داده‌ها استفاده شده است.

برای عملیات mutation، وضعیت UI قبل از پاسخ نهایی API به‌روزرسانی می‌شود و در صورت شکست درخواست، snapshot قبلی بازیابی می‌شود.

---

## سبد خرید

سبد خرید مهمان با یک شناسه پایدار در مرورگر نگهداری می‌شود. بعد از ورود کاربر، اقلام سبد مهمان با سبد حساب کاربری merge می‌شوند.

عملیات تغییر تعداد، افزودن و حذف آیتم‌ها به‌صورت optimistic انجام می‌شوند و در صورت خطا rollback خواهند شد.

---

## SEO

این پروژه یک SPA مبتنی بر Vite است و برای بهبود قابلیت ایندکس شدن صفحات عمومی، در زمان build یک لایه prerender برای محتوای SEO تولید می‌کند.

امکانات SEO شامل موارد زیر است:

- Title و description اختصاصی
- Canonical URL
- Open Graph
- Twitter metadata
- JSON-LD برای صفحات محصول
- Sitemap
- Robots
- داده اولیه محصول برای prerender
- تولید metadata از یک منبع مشترک

این ساختار با SSR کامل یک فریم‌ورک سرورمحور مانند Next.js یکسان نیست و پروژه عمداً به‌عنوان Vite SPA نگهداری شده است.

---

## تصاویر

کامپوننت `OptimizedImage` از چند نسخه تصویری استفاده می‌کند تا مرورگر بر اساس اندازه نمایش، فایل مناسب را انتخاب کند.

نسخه‌های تولیدشده شامل:

- 320px
- 640px
- 960px
- 1280px

و فرمت‌های مورد استفاده:

- AVIF
- WebP
- فرمت اصلی به‌عنوان fallback

برای تصاویر مهم بالای صفحه، اولویت بارگذاری در نظر گرفته شده و برای تصاویر غیرضروری lazy loading فعال است.

---

## دسترسی‌پذیری

در بخش‌های مهم پروژه موارد زیر رعایت شده‌اند:

- `aria-label`
- `aria-expanded`
- `aria-controls`
- `aria-current`
- `role="alert"`
- `aria-live`
- keyboard navigation
- مدیریت focus در modalها
- بازگرداندن focus پس از بسته شدن modal
- پشتیبانی از Escape و Tab در تعاملات مهم
- focus-visible برای کنترل‌های تعاملی

---

## متغیرهای محیطی

فایل محیطی برای اجرای معمول پروژه **اجباری نیست**. اگر `VITE_API_URL` تعریف نشود، پروژه به‌صورت پیش‌فرض از `http://localhost:3000` استفاده می‌کند. در صورت نیاز می‌توانید `.env.example` را به `.env.local` کپی کرده و مقادیر را تغییر دهید.

برای تنظیمات SEO نیز `VITE_SEO_API_URL` به‌صورت پیش‌فرض از `VITE_API_URL` استفاده می‌کند و `VITE_SEO_STRICT` در حالت عادی `false` است. اسکریپت `build:production` حالت strict را برای build نهایی فعال می‌کند.

---

## نصب و اجرا

### 1. نصب وابستگی‌ها

```bash
npm install
```

### 2. اجرای JSON Server

```bash
npm run server
```

### 3. اجرای Frontend

در ترمینال دیگری:

```bash
npm run dev
```

برنامه به‌صورت پیش‌فرض روی آدرس Vite اجرا می‌شود و API از پورت 3000 استفاده می‌کند.

### حساب آزمایشی
برای ورود به‌صورت آزمایشی می‌توانید از این حساب استفاده کنید:

- ایمیل: `mohammad@rakhtara.local`
- رمز عبور: `12345678`

---

## Build

### Build معمولی

```bash
npm run build
```

### Build مناسب انتشار

```bash
npm run build:production
```

در build production، داده‌های SEO قبل از ساخت خروجی بررسی و synchronized می‌شوند و در صورت نبود داده لازم، فرایند build متوقف خواهد شد.

### بررسی Lint

```bash
npm run lint
```

---

## استقرار

پروژه برای deployment به‌صورت SPA آماده شده و rewrite مسیرها به `index.html` در تنظیمات deployment در نظر گرفته شده است.

برای انتشار روی سرویس‌هایی مانند Netlify یا Vercel، کافی است متغیرهای محیطی مربوط به API و URL اصلی سایت تنظیم شوند.

---

## نکته درباره احراز هویت

احراز هویت این پروژه برای محیط Demo و Portfolio طراحی شده است. اطلاعات کاربر و نقش‌ها در سمت کلاینت مدیریت می‌شوند و برای یک محصول واقعی نباید به‌عنوان مکانیزم امنیتی نهایی استفاده شوند.

در یک معماری Production، احراز هویت، مجوز دسترسی و اعتبارسنجی نقش‌ها باید توسط Backend امن انجام شود.

---

## هدف پروژه

هدف اصلی Rakhtara نمایش یک پیاده‌سازی کامل Frontend برای یک فروشگاه اینترنتی است؛ از طراحی رابط و تجربه کاربری تا مدیریت داده، فرم‌ها، سبد خرید، پنل مدیریت، SEO، دسترسی‌پذیری و بهینه‌سازی تصاویر.

---

## توسعه‌دهنده

**Mohamad**

Frontend Developer با تمرکز بر React، JavaScript، TypeScript و توسعه رابط‌های کاربری مدرن.

---

## مجوز

این پروژه برای استفاده به‌عنوان نمونه‌کار و نمایش مهارت‌های توسعه Frontend منتشر شده است.
