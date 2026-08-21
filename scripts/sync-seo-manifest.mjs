import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const manifestPath = resolve(root, "public/seo/products.json");
const envFiles = [resolve(root, ".env"), resolve(root, ".env.production")];

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

let fileConfig = {};
for (const file of envFiles) {
  try { fileConfig = { ...fileConfig, ...parseEnv(await readFile(file, "utf8")) }; } catch {}
}

const apiUrl = (process.env.VITE_SEO_API_URL || process.env.VITE_API_URL || fileConfig.VITE_SEO_API_URL || fileConfig.VITE_API_URL || "").replace(/\/$/, "");
const strict = String(process.env.VITE_SEO_STRICT || fileConfig.VITE_SEO_STRICT || "false").toLowerCase() === "true";

async function readExisting() {
  try {
    const parsed = JSON.parse(await readFile(manifestPath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

if (!apiUrl) {
  if (strict) throw new Error("SEO manifest sync failed: VITE_SEO_API_URL/VITE_API_URL is required when VITE_SEO_STRICT=true.");
  console.warn("SEO manifest: no API URL configured; keeping the committed snapshot.");
  process.exit(0);
}

try {
  const response = await fetch(`${apiUrl}/products`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`/products returned ${response.status}`);
  const payload = await response.json();
  const products = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
  if (!products.length) throw new Error("The products endpoint returned no products.");

  await writeFile(
    manifestPath,
    `${JSON.stringify(products, null, 2)}\n`,
    "utf8",
  );
  console.log(`SEO manifest synchronized: ${products.length} products.`);
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";
  if (strict) throw new Error(`SEO manifest sync failed: ${message}`);
  const existing = await readExisting();
  if (!existing.length) {
    console.warn(`SEO manifest: API unavailable and no fallback snapshot exists (${message}). Product prerendering will be skipped.`);
  } else {
    console.warn(`SEO manifest: API unavailable; keeping ${existing.length} product fallback records (${message}).`);
  }
}
