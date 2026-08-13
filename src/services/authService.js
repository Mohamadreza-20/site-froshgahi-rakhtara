import api from "./api";
import { toJalaliToday } from "../utils/date";

const RESOURCE = "/users";

const DEFAULT_SIGNUP_ROLE = "مشتری";

async function getAllUsers() {
	const { data } = await api.get(RESOURCE);
	return data;
}

function matchesIdentifier(user, identifier) {
	const value = identifier.trim().toLowerCase();
	const emailMatch = user.email && user.email.toLowerCase() === value;
	const phoneMatch =
		user.phone && user.phone.replace(/\s/g, "") === identifier.trim();
	return Boolean(emailMatch || phoneMatch);
}

function stripPassword(user) {
	const safeUser = { ...user };
	delete safeUser.password;
	return safeUser;
}

export async function login({ identifier, password }) {
	try {
		const users = await getAllUsers();
		const user = users.find((currentUser) => matchesIdentifier(currentUser, identifier));

		if (!user || user.password !== password) {
			return {
				success: false,
				data: null,
				error: "ایمیل/شماره موبایل یا رمز عبور اشتباه است",
			};
		}

		if (user.status === "غیرفعال") {
			return {
				success: false,
				data: null,
				error: "حساب کاربری شما غیرفعال شده است. لطفاً با پشتیبانی تماس بگیرید.",
			};
		}

		return { success: true, data: stripPassword(user), error: null };
	} catch {
		return {
			success: false,
			data: null,
			error: "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.",
		};
	}
}

export async function register({ fullName, email, phone, password }) {
	try {
		const users = await getAllUsers();
		const alreadyExists = users.some(
			(currentUser) => matchesIdentifier(currentUser, email) || matchesIdentifier(currentUser, phone),
		);

		if (alreadyExists) {
			return {
				success: false,
				data: null,
				error: "کاربری با این ایمیل یا شماره موبایل قبلاً ثبت‌نام کرده است",
			};
		}

		const payload = {
			name: fullName,
			email,
			phone,
			password,
			role: DEFAULT_SIGNUP_ROLE,
			status: "فعال",
			joined: toJalaliToday(),
			seed: `${fullName}-${Date.now()}`,
		};

		const { data } = await api.post(RESOURCE, payload);

		return { success: true, data: stripPassword(data), error: null };
	} catch {
		return {
			success: false,
			data: null,
			error: "ثبت‌نام ناموفق بود، دوباره تلاش کنید",
		};
	}
}

export async function updateProfile(userId, { fullName, email, phone }) {
	try {
		const users = await getAllUsers();
		const conflict = users.some(
			(currentUser) =>
				currentUser.id !== userId &&
				(matchesIdentifier(currentUser, email) || matchesIdentifier(currentUser, phone)),
		);

		if (conflict) {
			return {
				success: false,
				data: null,
				error: "این ایمیل یا شماره موبایل قبلاً توسط کاربر دیگری استفاده شده است",
			};
		}

		const { data } = await api.patch(`${RESOURCE}/${userId}`, {
			name: fullName,
			email,
			phone,
		});

		return { success: true, data: stripPassword(data), error: null };
	} catch {
		return {
			success: false,
			data: null,
			error: "بروزرسانی اطلاعات ناموفق بود، دوباره تلاش کنید",
		};
	}
}

export async function changePassword(userId, { currentPassword, newPassword }) {
	try {
		const user = await getAllUsers().then((users) =>
			users.find((currentUser) => currentUser.id === userId),
		);

		if (!user || user.password !== currentPassword) {
			return {
				success: false,
				data: null,
				error: "رمز عبور فعلی اشتباه است",
			};
		}

		const { data } = await api.patch(`${RESOURCE}/${userId}`, {
			password: newPassword,
		});

		return { success: true, data: stripPassword(data), error: null };
	} catch {
		return {
			success: false,
			data: null,
			error: "تغییر رمز عبور ناموفق بود، دوباره تلاش کنید",
		};
	}
}
