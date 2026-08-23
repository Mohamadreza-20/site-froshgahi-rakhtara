import api from "./api";

const RESOURCE = "/users";

export const getUsers = async (params = {}) => {
	const { data } = await api.get(RESOURCE, { params });
	return data;
};

export const createUser = async (userData) => {
	const { data } = await api.post(RESOURCE, userData);
	return data;
};

export const updateUser = async (id, user) => {
	const { data } = await api.put(`${RESOURCE}/${id}`, user);
	return data;
};

export const deleteUser = async (id) => {
	const { data } = await api.delete(`${RESOURCE}/${id}`);
	return data;
};
