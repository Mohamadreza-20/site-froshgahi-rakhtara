import api from "./api";

const RESOURCE = "/products";

export const getProduct = async () => {
	const { data } = await api.get(RESOURCE);
	return data;
};

export const createProduct = async (productData) => {
	try {
		const { data } = await api.post(RESOURCE, productData);
		return data;
	} catch (error) {
		console.error("خطا در ارسال داده:", error.response?.data || error.message);
		throw error;
	}
};

export const updateProduct = async (id, product) => {
	const { data } = await api.put(`${RESOURCE}/${id}`, product);
	return data;
};

export const deleteProduct = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};
