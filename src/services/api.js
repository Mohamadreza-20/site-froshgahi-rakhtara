import axios from "axios";
import { env } from "../lib/config";
import { getErrorMessage } from "../utils/errors";

const api = axios.create({
	baseURL: env.VITE_API_URL,
	headers: { "Content-Type": "application/json" },
	timeout: 5000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;
		error.userMessage =
			error.code === "ECONNABORTED"
				? "درخواست بیش از حد طول کشید"
				: status === 401
					? "برای ادامه لازم است وارد حساب کاربری خود شوید"
					: status === 403
						? "دسترسی غیرمجاز"
						: status >= 500
							? "خطایی در سرور رخ داده است"
							: getErrorMessage(error, "ارتباط با سرور برقرار نشد");
		return Promise.reject(error);
	},
);

export default api;
