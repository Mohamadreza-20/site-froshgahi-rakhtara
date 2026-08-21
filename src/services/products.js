import api from "./api";

const RESOURCE = "/products";

function normalizeProductResponse(data, headers, params = {}) {
	if (Array.isArray(data)) {
		const total = Number(headers?.["x-total-count"]) || data.length;
		return {
			items: data,
			total,
			page: Number(params._page) || 1,
			perPage: Number(params._per_page) || total || data.length,
			pages: Number(params._per_page) ? Math.max(1, Math.ceil(total / Number(params._per_page))) : 1,
		};
	}

	const items = Array.isArray(data?.data) ? data.data : [];
	const total = Number(data?.items) || items.length;
	const perPage = Number(params._per_page) || items.length || total;
	return {
		items,
		total,
		page: Number(data?.first) || Number(params._page) || 1,
		perPage,
		pages: Number(data?.pages) || Math.max(1, Math.ceil(total / perPage)),
	};
}

export async function getProducts(params = {}) {
	const { data, headers } = await api.get(RESOURCE, { params });
	return normalizeProductResponse(data, headers, params);
}

export async function getProduct(id) {
	if (id !== undefined && id !== null) {
		const { data } = await api.get(`${RESOURCE}/${id}`);
		return data;
	}
	const result = await getProducts();
	return result.items;
}

export async function createProduct(productData) {
	const { data } = await api.post(RESOURCE, productData);
	return data;
}

export async function updateProduct(id, product) {
	const { data } = await api.put(`${RESOURCE}/${id}`, product);
	return data;
}

export async function deleteProduct(id) {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
}
