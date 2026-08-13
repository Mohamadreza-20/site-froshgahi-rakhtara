import { z } from "zod";

const IRANIAN_PHONE_RE = /^0?9\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailOrPhoneField = z
	.string()
	.trim()
	.min(1, "ایمیل یا شماره موبایل را وارد کنید")
	.refine((value) => EMAIL_RE.test(value) || IRANIAN_PHONE_RE.test(value), {
		message: "فرمت ایمیل یا شماره موبایل صحیح نیست",
	});

export const loginSchema = z.object({
	identifier: emailOrPhoneField,
	password: z.string().min(1, "رمز عبور را وارد کنید"),
});

export const registerSchema = z
	.object({
		fullName: z.string().trim().min(1, "نام و نام‌خانوادگی را وارد کنید"),
		email: z
			.string()
			.trim()
			.min(1, "ایمیل را وارد کنید")
			.refine((value) => EMAIL_RE.test(value), { message: "فرمت ایمیل صحیح نیست" }),
		phone: z
			.string()
			.trim()
			.min(1, "شماره موبایل را وارد کنید")
			.refine((value) => IRANIAN_PHONE_RE.test(value), {
				message: "فرمت شماره موبایل صحیح نیست",
			}),
		password: z
			.string()
			.min(1, "رمز عبور را وارد کنید")
			.min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
		confirmPassword: z.string(),
		acceptTerms: z.literal(true, {
			message: "برای ادامه باید قوانین را بپذیرید",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "رمز عبور و تکرار آن یکسان نیستند",
		path: ["confirmPassword"],
	});

export const updateProfileSchema = z.object({
	fullName: z.string().trim().min(1, "نام و نام‌خانوادگی را وارد کنید"),
	email: z
		.string()
		.trim()
		.min(1, "ایمیل را وارد کنید")
		.refine((value) => EMAIL_RE.test(value), { message: "فرمت ایمیل صحیح نیست" }),
	phone: z
		.string()
		.trim()
		.min(1, "شماره موبایل را وارد کنید")
		.refine((value) => IRANIAN_PHONE_RE.test(value), {
			message: "فرمت شماره موبایل صحیح نیست",
		}),
});

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "رمز عبور فعلی را وارد کنید"),
		newPassword: z
			.string()
			.min(1, "رمز عبور جدید را وارد کنید")
			.min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
		confirmNewPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "رمز عبور جدید و تکرار آن یکسان نیستند",
		path: ["confirmNewPassword"],
	});

export const newsletterSchema = z.object({
	email: z
		.string()
		.trim()
		.refine((value) => EMAIL_RE.test(value), {
			message: "لطفاً یک ایمیل معتبر وارد کنید",
		}),
});

export const contactSchema = z.object({
	name: z.string().trim().min(1, "نام و نام‌خانوادگی را وارد کنید"),
	email: z
		.string()
		.trim()
		.min(1, "ایمیل را وارد کنید")
		.refine((value) => EMAIL_RE.test(value), { message: "فرمت ایمیل صحیح نیست" }),
	phone: z
		.string()
		.trim()
		.optional()
		.refine((value) => !value || IRANIAN_PHONE_RE.test(value), {
			message: "فرمت شماره موبایل صحیح نیست",
		}),
	message: z
		.string()
		.trim()
		.min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد"),
});
export function getZodErrors(schema, values) {
	const result = schema.safeParse(values);
	if (result.success) return {};

	const errors = {};
	for (const issue of result.error.issues) {
		const key = issue.path[0] ?? "_form";
		if (!(key in errors)) errors[key] = issue.message;
	}
	return errors;
}
