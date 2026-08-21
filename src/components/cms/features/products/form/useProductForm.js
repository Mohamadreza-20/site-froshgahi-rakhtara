import { useEffect, useState } from "react";
import { CATEGORIES } from "../../../../../lib/data/products";

export const emptyProductForm = { name: "", cat: CATEGORIES[0].name, price: "", stock: "", sku: "", desc: "", sizes: "", image: "", longDesc: "" };

function normalizeProduct(product) {
  if (!product) return emptyProductForm;
  return {
    name: product.name ?? "",
    cat: product.cat ?? CATEGORIES[0].name,
    price: product.price ?? "",
    stock: product.stock ?? "",
    sku: product.sku ?? "",
    desc: product.desc ?? "",
    sizes: Array.isArray(product.sizes) ? product.sizes.join("، ") : "",
    image: product.image ?? "",
    longDesc: product.longDesc ?? "",
  };
}

export function useProductForm(open, product) {
  const [form, setForm] = useState(emptyProductForm);
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setForm(normalizeProduct(product));
    setImageError("");
    setErrors({});
  }, [open, product]);

  const onChange = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));
  const buildPayload = () => ({
    ...form,
    price: Number(form.price) || 0,
    stock: Number(form.stock) || 0,
    sizes: form.sizes.split(/[،,]/).map((size) => size.trim()).filter(Boolean),
  });

  return { form, setForm, errors, setErrors, imageError, setImageError, onChange, buildPayload };
}
