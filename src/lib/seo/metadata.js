export const DEFAULT_META = {
  title: "Rakhtara | فروشگاه اینترنتی پوشاک",
  description: "Rakhtara؛ فروشگاه اینترنتی پوشاک با محصولات متنوع، تجربه خرید فارسی و طراحی واکنش‌گرا.",
  type: "website",
  robots: "index, follow",
};

export const STATIC_SEO_ROUTES = [
  { path: "/", ...DEFAULT_META },
  { path: "/products", title: "محصولات | Rakhtara", description: "مشاهده و مقایسه محصولات پوشاک، کیف، کفش و اکسسوری فروشگاه Rakhtara.", type: "website", robots: "index, follow" },
  { path: "/about-us", title: "درباره ما | Rakhtara", description: "با داستان، ارزش‌ها و تیم Rakhtara آشنا شوید.", type: "website", robots: "index, follow" },
  { path: "/contact-us", title: "تماس با ما | Rakhtara", description: "راه‌های ارتباطی و فرم تماس با فروشگاه Rakhtara.", type: "website", robots: "index, follow" },
];

export const CATEGORY_SEO = [
  { id: "women", title: "پوشاک زنانه | Rakhtara", description: "خرید پوشاک زنانه از فروشگاه Rakhtara.", type: "website", robots: "index, follow" },
  { id: "men", title: "پوشاک مردانه | Rakhtara", description: "خرید پوشاک مردانه از فروشگاه Rakhtara.", type: "website", robots: "index, follow" },
  { id: "shoes", title: "کیف و کفش | Rakhtara", description: "خرید کیف و کفش از فروشگاه Rakhtara.", type: "website", robots: "index, follow" },
  { id: "accessory", title: "اکسسوری | Rakhtara", description: "خرید اکسسوری از فروشگاه Rakhtara.", type: "website", robots: "index, follow" },
];

export function getStaticRouteMeta(pathname) {
  return STATIC_SEO_ROUTES.find((route) => route.path === pathname) || CATEGORY_SEO.find((route) => pathname === `/category/${route.id}`) || null;
}

export function getProductMeta(product, path) {
  if (!product) return null;
  return {
    path,
    title: `${product.name} | Rakhtara`,
    description: product.description || product.longDesc || product.desc || `خرید ${product.name} از فروشگاه Rakhtara.`,
    image: product.image,
    type: "product",
    robots: "index, follow",
  };
}

export function resolveRouteMeta({ pathname = "/", product } = {}) {
  return getStaticRouteMeta(pathname) || getProductMeta(product, pathname) || { path: pathname, ...DEFAULT_META };
}
