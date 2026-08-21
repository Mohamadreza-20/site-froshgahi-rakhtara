import api from "../api";

const RESOURCE = "/users";

export async function getAllUsers() {
  const { data } = await api.get(RESOURCE);
  return data;
}

export async function getUserById(userId) {
  const { data } = await api.get(`${RESOURCE}/${userId}`);
  return data;
}

export async function createUserRecord(payload) {
  const { data } = await api.post(RESOURCE, payload);
  return data;
}

export async function updateUserRecord(userId, payload) {
  const { data } = await api.patch(`${RESOURCE}/${userId}`, payload);
  return data;
}

export function matchesIdentifier(user, identifier = "") {
  const value = identifier.trim().toLowerCase();
  const phone = identifier.trim().replace(/\s/g, "");
  return Boolean(
    (user.email && user.email.toLowerCase() === value) ||
    (user.phone && user.phone.replace(/\s/g, "") === phone),
  );
}

export function stripPassword(user) {
  const safeUser = { ...user };
  delete safeUser.password;
  return safeUser;
}
