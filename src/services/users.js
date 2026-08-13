import api from "./api";

const RESOURCE = "/users";

export const getUsers = async () => {
	const { data } = await api.get(RESOURCE);
	return data;
};

export const createUser = async (userData) => {
	try {
		const { data } = await api.post(RESOURCE, userData);
		return data;
	} catch (error) {
		console.error("خطا در ارسال داده:", error.response?.data || error.message);
		throw error;
	}
};

export const updateUser = async (id, user) => {
	const { data } = await api.put(`${RESOURCE}/${id}`, user);
	return data;
};

export const deleteUser = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};
