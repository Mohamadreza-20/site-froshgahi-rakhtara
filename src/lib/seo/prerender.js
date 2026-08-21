import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

export function PrerenderedSeoContent({ route }) {
  const heading = route.product ? route.product.name : route.title.replace(/ \| Rakhtara$/, "");
  const description = route.description;
  const body = route.product
    ? React.createElement(
        "article",
        { className: "seo-product" },
        React.createElement("h1", null, route.product.name),
        React.createElement("p", null, description),
        route.product.price != null
          ? React.createElement("p", null, `قیمت: ${Number(route.product.price).toLocaleString("fa-IR")} تومان`)
          : null,
        route.product.stock != null
          ? React.createElement("p", null, Number(route.product.stock) > 0 ? "موجود" : "ناموجود")
          : null,
        React.createElement("a", { href: route.path }, "مشاهده جزئیات محصول"),
      )
    : React.createElement(
        "article",
        { className: "seo-page" },
        React.createElement("h1", null, heading),
        React.createElement("p", null, description),
        React.createElement("a", { href: route.path }, "ورود به این صفحه"),
      );

  return React.createElement("main", { id: "seo-prerender", "data-route": route.path, lang: "fa", dir: "rtl" }, body);
}

export function renderPrerenderedSeoContent(route) {
  return renderToStaticMarkup(React.createElement(PrerenderedSeoContent, { route }));
}
