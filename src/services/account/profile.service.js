import { getAllUsers, getUserById, matchesIdentifier, stripPassword, updateUserRecord } from "./users.service";

function failure(error) {
  return { success: false, data: null, error };
}

export async function updateProfile(userId, { fullName, email, phone }) {
  try {
    const users = await getAllUsers();
    const conflict = users.some(
      (currentUser) =>
        String(currentUser.id) !== String(userId) &&
        (matchesIdentifier(currentUser, email) || matchesIdentifier(currentUser, phone)),
    );
    if (conflict) return failure("این ایمیل یا شماره موبایل قبلاً توسط کاربر دیگری استفاده شده است");

    const data = await updateUserRecord(userId, { name: fullName, email, phone });
    return { success: true, data: stripPassword(data), error: null };
  } catch {
    return failure("بروزرسانی اطلاعات ناموفق بود، دوباره تلاش کنید");
  }
}

export async function changePassword(userId, { currentPassword, newPassword }) {
  try {
    const user = await getUserById(userId);
    if (!user || user.password !== currentPassword) return failure("رمز عبور فعلی اشتباه است");
    const data = await updateUserRecord(userId, { password: newPassword });
    return { success: true, data: stripPassword(data), error: null };
  } catch {
    return failure("تغییر رمز عبور ناموفق بود، دوباره تلاش کنید");
  }
}
