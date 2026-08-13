import api from "./api";

const RESOURCE = "/comments";

export const getAllComments = async () => {
	const { data } = await api.get(RESOURCE);
	return data;
};

export const getComments = async (productId) => {
	const all = await getAllComments();
	if (!productId) return all;
	return all.filter((comment) => String(comment.productId) === String(productId));
};

export const createComment = async (comment) => {
	const { data } = await api.post(RESOURCE, comment);
	return data;
};

export const deleteComment = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};
