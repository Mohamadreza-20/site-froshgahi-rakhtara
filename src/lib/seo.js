export { DEFAULT_META, STATIC_SEO_ROUTES, CATEGORY_SEO, getStaticRouteMeta, getProductMeta } from "./seo/metadata.js";

const DEFAULT_SITE_URL = "http://localhost:5173";
export const PRICE_CURRENCY = "IRR";
export const PRICE_MULTIPLIER = 10;

export function getSiteUrl() {
  const configured = typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return DEFAULT_SITE_URL;
}

export function toAbsoluteUrl(value) {
  if (!value) return undefined;
  return new URL(value, getSiteUrl()).href;
}

export function productAvailability(stock) {
  return Number(stock) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";
}

export function toSchemaPrice(price) {
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) return undefined;
  return numericPrice * PRICE_MULTIPLIER;
}


export function buildProductJsonLd(product, url, rating, { siteUrl } = {}) {
  if (!product) return null;
  const averageRating = Number(rating?.average || 0);
  const reviewCount = Number(rating?.count || 0);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.longDesc || product.desc || `${product.name} از محصولات Rakhtara.`,
    image: product.image ? [new URL(product.image, siteUrl || getSiteUrl()).href] : undefined,
    sku: product.sku || (product.id != null ? String(product.id) : undefined),
    brand: { "@type": "Brand", name: "Rakhtara" },
    category: product.cat,
    url,
    offers: {
      "@type": "Offer", url, priceCurrency: PRICE_CURRENCY, price: toSchemaPrice(product.price),
      availability: productAvailability(product.stock), itemCondition: "https://schema.org/NewCondition",
    },
    ...(averageRating > 0 && reviewCount > 0 ? {
      aggregateRating: { "@type": "AggregateRating", ratingValue: Number(averageRating.toFixed(1)), bestRating: 5, worstRating: 1, ratingCount: reviewCount },
    } : {}),
  };
}
