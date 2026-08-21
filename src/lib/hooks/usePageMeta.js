import { useLayoutEffect } from "react";
import { DEFAULT_META, resolveRouteMeta } from "../seo/metadata.js";
import { getSiteUrl, toAbsoluteUrl } from "../seo";

function upsertMeta(attribute, key, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

function removeManagedJsonLd() {
  document.head.querySelectorAll('script[data-rakhtara-jsonld="true"]').forEach((node) => node.remove());
}

export function usePageMeta(options = {}) {
  const meta = { ...resolveRouteMeta(options), ...options };
  const serializedJsonLd = options.jsonLd ? JSON.stringify(options.jsonLd) : "";

  useLayoutEffect(() => {
    const canonicalUrl = new URL(meta.path || "/", `${getSiteUrl()}/`).href;
    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:type", meta.type || "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:locale", "fa_IR");
    upsertMeta("property", "og:site_name", "Rakhtara");
    upsertMeta("name", "robots", meta.robots || "index, follow");
    upsertMeta("name", "twitter:card", meta.image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);

    if (meta.image) {
      const absoluteImage = toAbsoluteUrl(meta.image);
      upsertMeta("property", "og:image", absoluteImage);
      upsertMeta("name", "twitter:image", absoluteImage);
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove();
      document.head.querySelector('meta[name="twitter:image"]')?.remove();
    }

    upsertCanonical(canonicalUrl);
    removeManagedJsonLd();
    if (serializedJsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.rakhtaraJsonld = "true";
      script.textContent = serializedJsonLd;
      document.head.appendChild(script);
    }

    return () => {
      document.title = DEFAULT_META.title;
      upsertMeta("name", "description", DEFAULT_META.description);
      upsertMeta("name", "robots", DEFAULT_META.robots);
      removeManagedJsonLd();
    };
  }, [meta.description, meta.image, meta.path, meta.robots, meta.title, meta.type, serializedJsonLd]);
}

export { buildProductJsonLd } from "../seo";
