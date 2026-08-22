import { z } from "zod";

const IRANIAN_PHONE_RE = /^09\d{9}$/;
const EMAIL_RE = /^[A-Za-z0-9](?:[A-Za-z0-9.]{4,28}[A-Za-z0-9])?@gmail\.com$/;
const FULL_NAME_RE = /^[\u0600-\u06FF]+(?:[\u200C\s][\u0600-\u06FF]+)+$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*._-]{8,64}$/;

const emailOrPhoneField = z
  .string()
  .trim()
  .min(1, "ایمیل یا شماره موبایل را وارد کنید")
  .refine((value) => EMAIL_RE.test(value) || IRANIAN_PHONE_RE.test(value), {
    message: "فرمت ایمیل یا شماره موبایل صحیح نیست",
  });

const fullNameField = z
  .string()
  .trim()
  .min(3, "نام و نام‌خانوادگی را وارد کنید")
  .max(50, "نام و نام‌خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد")
  .refine((value) => FULL_NAME_RE.test(value), {
    message: "نام و نام‌خانوادگی را صحیح وارد کنید",
  });

const emailField = z
  .string()
  .trim()
  .min(1, "ایمیل را وارد کنید")
  .refine((value) => EMAIL_RE.test(value), {
    message: "فرمت ایمیل صحیح نیست",
  });

const phoneField = z
  .string()
  .trim()
  .min(1, "شماره موبایل را وارد کنید")
  .refine((value) => IRANIAN_PHONE_RE.test(value), {
    message: "فرمت شماره موبایل صحیح نیست",
  });

const passwordField = z
  .string()
  .min(1, "رمز عبور را وارد کنید")
  .refine((value) => PASSWORD_RE.test(value), {
    message: "رمز عبور باید ۸ تا ۶۴ کاراکتر و شامل حروف انگلیسی و عدد باشد",
  });

export const loginSchema = z.object({
  identifier: emailOrPhoneField,
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});

export const registerSchema = z
  .object({
    fullName: fullNameField,
    email: emailField,
    phone: phoneField,
    password: passwordField,
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
  fullName: fullNameField,
  email: emailField,
  phone: phoneField,
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "رمز عبور فعلی را وارد کنید"),
    newPassword: passwordField,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "رمز عبور جدید و تکرار آن یکسان نیستند",
    path: ["confirmNewPassword"],
  });

export const newsletterSchema = z.object({
  email: emailField,
});

export const contactSchema = z.object({
  name: fullNameField,
  email: emailField,
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
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(1000, "متن پیام نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
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
