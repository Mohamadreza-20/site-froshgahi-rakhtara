import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../../services/products";
import { queryKeys } from "../queryKeys";

function normalizeText(value) {
  return String(value ?? "").trim().toLocaleLowerCase("fa-IR");
}

function normalizeParams(params = {}) {
  return {
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 6,
  };
}

function productMatches(product, params) {
  const search = normalizeText(params.search);
  const category = params.category;
  const categoryId = params.categoryId;
  const minPrice = params.minPrice === "" || params.minPrice == null ? null : Number(params.minPrice);
  const maxPrice = params.maxPrice === "" || params.maxPrice == null ? null : Number(params.maxPrice);
  const stock = Number(product.stock) || 0;
  const price = Number(product.price) || 0;

  if (search) {
    const haystack = normalizeText([
      product.name,
      product.description,
      product.cat,
      ...(Array.isArray(product.sizes) ? product.sizes : []),
      ...(Array.isArray(product.colors) ? product.colors : []),
    ].join(" "));
    if (!haystack.includes(search)) return false;
  }

  if (categoryId && categoryId !== "all") {
    const productCategoryId = product.categoryId != null ? String(product.categoryId) : "";
    if (productCategoryId) {
      if (productCategoryId !== String(categoryId)) return false;
    } else if (category && category !== "all" && normalizeText(product.cat) !== normalizeText(category)) {
      return false;
    }
  } else if (category && category !== "all" && normalizeText(product.cat) !== normalizeText(category)) {
    return false;
  }
  if (minPrice != null && Number.isFinite(minPrice) && price < minPrice) return false;
  if (maxPrice != null && Number.isFinite(maxPrice) && price > maxPrice) return false;

  if (params.stockFilter === "inStock" && stock <= 0) return false;
  if (params.stockFilter === "lowStock" && (stock <= 0 || stock > 6)) return false;
  if (params.stockFilter === "outOfStock" && stock !== 0) return false;

  return true;
}

export function useProducts(params = {}) {
  const normalizedParams = normalizeParams(params);
  const query = useQuery({
    queryKey: queryKeys.products.catalog,
    queryFn: async () => {
      const result = await getProducts();
      return result.items;
    },
    enabled: params.enabled !== false,
    placeholderData: (previous) => previous,
    meta: { showGlobalLoading: true },
  });

  const allProducts = Array.isArray(query.data) ? query.data : [];
  const filtered = allProducts.filter((product) => productMatches(product, params));
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / normalizedParams.limit));
  const safePage = Math.min(normalizedParams.page, totalPages);
  const start = (safePage - 1) * normalizedParams.limit;
  const items = filtered.slice(start, start + normalizedParams.limit);

  return {
    products: items,
    total,
    page: safePage,
    perPage: normalizedParams.limit,
    totalPages,
    loading: query.isLoading,
    fetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useProduct(id, options = {}) {
  return useQuery({
    ...options,
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProduct(id),
    enabled: Boolean(id) && options.enabled !== false,
    meta: { showGlobalLoading: true, ...options.meta },
  });
}

export function useProductMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.products.catalog });

  return {
    create: useMutation({ mutationFn: createProduct, onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, data }) => updateProduct(id, data), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: deleteProduct, onSuccess: invalidate }),
  };
}
