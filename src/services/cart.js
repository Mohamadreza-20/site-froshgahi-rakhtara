import api from "./api";

const RESOURCE = "/cart";

export const getCartItems = async (ownerId) => {
	const { data } = await api.get(RESOURCE, { params: { ownerId } });
	return data;
};

export const createCartItem = async (item) => {
	const { data } = await api.post(RESOURCE, item);
	return data;
};

export const updateCartItem = async (id, patch) => {
	const { data } = await api.patch(`${RESOURCE}/${id}`, patch);
	return data;
};

export const deleteCartItem = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};
