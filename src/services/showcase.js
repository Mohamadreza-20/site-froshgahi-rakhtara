import api from "./api";

const RESOURCE = "/showcase";

export const getShowcaseImages = async () => {
	const { data } = await api.get(RESOURCE);
	return [...data].sort((firstImage, secondImage) => (firstImage.order ?? 0) - (secondImage.order ?? 0));
};

export const createShowcaseImage = async (image) => {
	try {
		const { data } = await api.post(RESOURCE, image);
		return data;
	} catch (error) {
		console.error("خطا در افزودن عکس:", error.response?.data || error.message);
		throw error;
	}
};

export const updateShowcaseImage = async (id, image) => {
	const { data } = await api.put(`${RESOURCE}/${id}`, image);
	return data;
};

export const deleteShowcaseImage = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};
