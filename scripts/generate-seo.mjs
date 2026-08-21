import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { CATEGORY_SEO, DEFAULT_META, STATIC_SEO_ROUTES, getProductMeta } from "../src/lib/seo/metadata.js";
import { buildProductJsonLd } from "../src/lib/seo.js";
import { buildSeoHead } from "../src/lib/seo/head.js";
import { renderPrerenderedSeoContent } from "../src/lib/seo/prerender.js";

const root = process.cwd();
const distDir = resolve(root, "dist");
const templatePath = resolve(distDir, "index.html");
const envFiles = [resolve(root, ".env"), resolve(root, ".env.production")];
const productManifestPath = resolve(root, "public/seo/products.json");

function parseEnv(text) {
  return Object.fromEntries(
    text.split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index), line.slice(index + 1).replace(/^['"]|['"]$/g, "")];
      }),
  );
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function getConfig() {
  let fileConfig = {};
  for (const file of envFiles) {
    try { fileConfig = { ...fileConfig, ...parseEnv(await readFile(file, "utf8")) }; } catch {}
  }
  const apiUrl = (process.env.VITE_SEO_API_URL || process.env.VITE_API_URL || fileConfig.VITE_SEO_API_URL || fileConfig.VITE_API_URL || "").replace(/\/$/, "");
  const siteUrl = (process.env.VITE_SITE_URL || fileConfig.VITE_SITE_URL || "http://localhost:5173").replace(/\/$/, "");
  const strict = String(process.env.VITE_SEO_STRICT || fileConfig.VITE_SEO_STRICT || "false").toLowerCase() === "true";
  if (strict && siteUrl.startsWith("http://localhost")) {
    throw new Error("VITE_SITE_URL must point to the public site origin when VITE_SEO_STRICT=true.");
  }
  return { apiUrl, siteUrl, strict };
}

const { apiUrl, siteUrl, strict } = await getConfig();

async function readProductManifest() {
  try {
    const parsed = JSON.parse(await readFile(productManifestPath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

async function fetchJson(path) {
  if (!apiUrl) return { ok: false, data: null, error: "API URL is not configured" };
  try {
    const response = await fetch(`${apiUrl}${path}`, { headers: { Accept: "application/json" } });
    if (!response.ok) return { ok: false, data: null, error: `${path} returned ${response.status}` };
    return { ok: true, data: await response.json(), error: null };
  } catch (error) {
    return { ok: false, data: null, error: error instanceof Error ? error.message : "Network error" };
  }
}

const manifestProducts = await readProductManifest();
let products = manifestProducts;
let comments = [];
const productsResult = apiUrl ? await fetchJson("/products") : null;
const commentsResult = apiUrl ? await fetchJson("/comments") : null;

if (productsResult?.ok) {
  const fetched = Array.isArray(productsResult.data) ? productsResult.data : Array.isArray(productsResult.data?.data) ? productsResult.data.data : [];
  if (fetched.length) products = fetched;
} else if (apiUrl && strict) {
  throw new Error(`SEO build failed: product API is unavailable. ${productsResult?.error || "Unknown error"}`);
} else if (apiUrl && productsResult && !productsResult.ok) {
  console.warn(`SEO: API unavailable (${productsResult.error}); falling back to public/seo/products.json.`);
}

if (commentsResult?.ok) {
  comments = Array.isArray(commentsResult.data) ? commentsResult.data : Array.isArray(commentsResult.data?.data) ? commentsResult.data.data : [];
} else if (apiUrl && strict) {
  throw new Error(`SEO build failed: comments API is unavailable. ${commentsResult?.error || "Unknown error"}`);
}

if (!products.length) {
  if (strict) throw new Error("SEO build failed: no product data is available. Provide a reachable build-time API or a valid public/seo/products.json manifest.");
  console.warn("SEO: no product data available; generating static routes without product URLs.");
}

const staticRoutes = [...STATIC_SEO_ROUTES, ...CATEGORY_SEO.map((route) => ({ path: `/category/${route.id}`, ...route }))];

function routeProductMeta(product) {
  const path = `/product/${product.id}`;
  const url = `${siteUrl}${path}`;
  const ratingSummary = commentsByProductId.get(String(product.id)) || { count: 0, sum: 0 };
  const ratingCount = ratingSummary.count;
  const ratingAverage = ratingCount ? ratingSummary.sum / ratingCount : 0;
  return {
    ...getProductMeta(product, path),
    jsonLd: buildProductJsonLd(product, url, { count: ratingCount, average: ratingAverage }, { siteUrl }),
    product,
  };
}

const commentsByProductId = new Map();
for (const comment of comments) {
  const key = String(comment?.productId ?? "");
  if (!key) continue;
  const current = commentsByProductId.get(key) || { count: 0, sum: 0 };
  const rating = Number(comment?.rating || 0);
  commentsByProductId.set(key, { count: current.count + 1, sum: current.sum + (Number.isFinite(rating) ? rating : 0) });
}

const productRoutes = products.filter((product) => product?.id != null && product?.name).map(routeProductMeta);
const allRoutes = [...staticRoutes, ...productRoutes];
const template = await readFile(templatePath, "utf8");

function buildHtml(route) {
  const head = buildSeoHead(route, { siteUrl, jsonLd: route.jsonLd });
  const body = renderPrerenderedSeoContent(route);
  return template.replace("</head>", `${head}\n</head>`).replace('<div id="seo-prerender"></div>', `<div id="seo-prerender">${body}</div>`);
}

for (const route of allRoutes) {
  const routeDir = resolve(distDir, `.${route.path}`, "index.html");
  await mkdir(dirname(routeDir), { recursive: true });
  await writeFile(routeDir, buildHtml(route), "utf8");
}

const today = new Date().toISOString().slice(0, 10);
const urls = allRoutes.map((route) => {
  const lastmod = route.product?.updatedAt || route.product?.modifiedAt || today;
  return `  <url><loc>${escapeXml(siteUrl + route.path)}</loc><lastmod>${escapeXml(String(lastmod).slice(0, 10))}</lastmod><changefreq>${route.path.startsWith("/product/") ? "weekly" : "monthly"}</changefreq></url>`;
}).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(resolve(distDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(resolve(distDir, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /auth\nDisallow: /account\nDisallow: /dashboard\nDisallow: /forbidden\nSitemap: ${siteUrl}/sitemap.xml\n`, "utf8");

console.log(`SEO prerender complete: ${allRoutes.length} routes, ${productRoutes.length} product URLs.`);
