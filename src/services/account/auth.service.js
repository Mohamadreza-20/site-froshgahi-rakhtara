import { createUserRecord, getAllUsers, matchesIdentifier, stripPassword } from "./users.service";

function failure(error) {
  return { success: false, data: null, error };
}

export async function login({ identifier, password }) {
  try {
    const users = await getAllUsers();
    const user = users.find((currentUser) => matchesIdentifier(currentUser, identifier));
    if (!user || user.password !== password) return failure("ایمیل/شماره موبایل یا رمز عبور اشتباه است");
    if (user.status === "غیرفعال") return failure("حساب کاربری شما غیرفعال شده است. لطفاً با پشتیبانی تماس بگیرید.");
    return { success: true, data: stripPassword(user), error: null };
  } catch {
    return failure("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
  }
}

export async function register(
  { fullName, email, phone, password },
  { today, defaultRole = "مشتری" } = {},
) {
  try {
    const users = await getAllUsers();
    const duplicate = users.some(
      (currentUser) => matchesIdentifier(currentUser, email) || matchesIdentifier(currentUser, phone),
    );
    if (duplicate) return failure("کاربری با این ایمیل یا شماره موبایل قبلاً ثبت‌نام کرده است");

    const payload = {
      name: fullName,
      email,
      phone,
      password,
      role: defaultRole,
      status: "فعال",
      joined: today,
      seed: `${fullName}-${Date.now()}`,
    };

    return { success: true, data: stripPassword(await createUserRecord(payload)), error: null };
  } catch {
    return failure("ثبت‌نام ناموفق بود، دوباره تلاش کنید");
  }
}
