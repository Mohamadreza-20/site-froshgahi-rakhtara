import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../services/categories";
import { getProducts, updateProduct } from "../../services/products";
import { queryKeys } from "../queryKeys";

export const DEFAULT_CATEGORIES = [
  { id: "women", name: "پوشاک زنانه", emoji: "👗", bg: "bg-rust" },
  { id: "men", name: "پوشاک مردانه", emoji: "👔", bg: "bg-forest-light" },
  { id: "shoes", name: "کیف و کفش", emoji: "👜", bg: "bg-camel-dark" },
  { id: "accessory", name: "اکسسوری", emoji: "🕶️", bg: "bg-ink" },
];

export function useCategories(options = {}) {
  const query = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const categories = await getCategories();
      return categories.length ? categories : DEFAULT_CATEGORIES;
    },
    ...options,
  });

  return {
    ...query,
    categories: Array.isArray(query.data) ? query.data : DEFAULT_CATEGORIES,
  };
}

function normalizeName(value) {
  return String(value ?? "").trim().toLocaleLowerCase("fa-IR");
}

export function buildCategoryPayload(input, existingCategories = []) {
  const name = String(input?.name ?? "").trim();
  const emoji = String(input?.emoji ?? "🛍️").trim() || "🛍️";
  const bg = String(input?.bg ?? "bg-forest-light").trim() || "bg-forest-light";
  const duplicateName = existingCategories.some((category) => normalizeName(category?.name) === normalizeName(name));
  if (!name) throw new Error("CATEGORY_NAME_REQUIRED");
  if (duplicateName) throw new Error("DUPLICATE_CATEGORY");
  return { name, emoji, bg };
}

async function findProductsForCategory(category) {
  const products = (await getProducts()).items;
  const categoryId = String(category?.id ?? "");
  const categoryName = normalizeName(category?.name);
  return products.filter((product) => {
    const productId = product?.categoryId != null && product.categoryId !== "" ? String(product.categoryId) : "";
    return (productId && productId === categoryId) || normalizeName(product?.cat) === categoryName;
  });
}

export function useCategoryMutations() {
  const queryClient = useQueryClient();

  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all }),
    ]);
  };

  return {
    create: useMutation({
      mutationFn: createCategory,
      onSuccess: async () => {
        await refresh();
      },
    }),
    update: useMutation({
      mutationFn: async ({ id, data, previousName }) => {
        const updated = await updateCategory(id, data);
        if (previousName && previousName !== updated.name) {
          const affected = await findProductsForCategory({ id, name: previousName });
          await Promise.all(affected.map((product) => updateProduct(product.id, {
            ...product,
            cat: updated.name,
            categoryId: updated.id,
          })));
        }
        return updated;
      },
      onSuccess: refresh,
    }),
    remove: useMutation({
      mutationFn: async (category) => {
        const affected = await findProductsForCategory(category);
        await Promise.all(affected.map((product) => updateProduct(product.id, {
          ...product,
          cat: "",
          categoryId: "",
        })));
        return deleteCategory(category.id);
      },
      onSuccess: refresh,
    }),
  };
}
