import { useEffect, useState } from "react";
import { useCategories } from "../../../../../lib/hooks/useCategories";

export const emptyProductForm = { name: "", cat: "", categoryId: "", price: "", stock: "", sku: "", desc: "", sizes: "", image: "", longDesc: "" };

function normalizeProduct(product) {
  if (!product) return emptyProductForm;
  return {
    name: product.name ?? "",
    cat: product.cat ?? "",
    categoryId: product.categoryId != null ? String(product.categoryId) : "",
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
  const { categories } = useCategories();
  const [form, setForm] = useState(emptyProductForm);
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    const nextForm = normalizeProduct(product);
    if (!product && categories[0]) {
      nextForm.cat = categories[0].name;
      nextForm.categoryId = String(categories[0].id);
    }
    setForm(nextForm);
    setImageError("");
    setErrors({});
  }, [categories, open, product]);

  const onChange = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));
  const buildPayload = () => ({
    ...form,
    price: Number(form.price) || 0,
    stock: Number(form.stock) || 0,
    sizes: form.sizes.split(/[،,]/).map((size) => size.trim()).filter(Boolean),
  });

  return { form, setForm, errors, setErrors, imageError, setImageError, onChange, buildPayload };
}
