import axios from "axios";

export function getErrorMessage(error, fallback = "عملیات با خطا مواجه شد") {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (error.userMessage) return error.userMessage;
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallback;
  }
  return error.message || fallback;
}
