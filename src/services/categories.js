import api from "./api";

const RESOURCE = "/categories";

export async function getCategories() {
  const { data } = await api.get(RESOURCE);
  const items = Array.isArray(data) ? data : [];
  return items.sort((a, b) => String(a?.name ?? "").localeCompare(String(b?.name ?? ""), "fa"));
}

export async function createCategory(category) {
  const name = String(category?.name ?? "").trim();
  if (!name) throw new Error("نام دسته‌بندی الزامی است");

  const payload = {
    id: `cat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    emoji: String(category?.emoji ?? "🛍️").trim() || "🛍️",
    bg: String(category?.bg ?? "bg-forest-light").trim() || "bg-forest-light",
  };

  const { data } = await api.post(RESOURCE, payload);
  return data;
}

export async function updateCategory(id, category) {
  const categoryId = String(id ?? "").trim();
  if (!categoryId) throw new Error("شناسه دسته‌بندی نامعتبر است");

  const payload = {
    name: String(category?.name ?? "").trim(),
    emoji: String(category?.emoji ?? "🛍️").trim() || "🛍️",
    bg: String(category?.bg ?? "bg-forest-light").trim() || "bg-forest-light",
  };

  if (!payload.name) throw new Error("نام دسته‌بندی الزامی است");

  const { data } = await api.put(`${RESOURCE}/${encodeURIComponent(categoryId)}`, payload);
  return data;
}

export async function deleteCategory(id) {
  const categoryId = String(id ?? "").trim();
  if (!categoryId) throw new Error("شناسه دسته‌بندی نامعتبر است");

  const { data } = await api.delete(`${RESOURCE}/${encodeURIComponent(categoryId)}`);
  return data;
}
