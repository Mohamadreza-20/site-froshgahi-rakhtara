import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../services/products";
import { queryKeys } from "../queryKeys";

function normalizeParams(params = {}) {
  const sortField = params.sortField?.trim();
  const sortOrder = params.sortOrder === "desc" ? "desc" : "asc";
  const raw = {
    _page: params.page,
    _per_page: params.limit,
    cat: params.category && params.category !== "all" ? params.category : undefined,
    q: params.search?.trim() || undefined,
    _sort: sortField ? `${sortOrder === "desc" ? "-" : ""}${sortField}` : undefined,
  };

  return Object.fromEntries(
    Object.entries(raw).filter(([, value]) => value !== undefined && value !== ""),
  );
}

export function useProducts(params = {}) {
  const normalizedParams = normalizeParams(params);
  const query = useQuery({
    queryKey: queryKeys.products.list(normalizedParams),
    queryFn: () => getProducts(normalizedParams),
    enabled: params.enabled !== false,
    placeholderData: (previous) => previous,
    meta: { showGlobalLoading: true },
  });

  const data = query.data ?? { items: [], total: 0, page: 1, perPage: 0, pages: 1 };
  return {
    products: data.items,
    total: data.total,
    page: data.page,
    perPage: data.perPage,
    totalPages: data.pages,
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
  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.products.all });

  return {
    create: useMutation({ mutationFn: createProduct, onSuccess: invalidate }),
    update: useMutation({
      mutationFn: ({ id, data }) => updateProduct(id, data),
      onSuccess: invalidate,
    }),
    remove: useMutation({ mutationFn: deleteProduct, onSuccess: invalidate }),
  };
}
