import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.code === "ECONNABORTED") {
			toast("درخواست بیش از حد طول کشید");
		}

		switch (error.response?.status) {
			case 401: {
				toast("برای ادامه لازم است وارد حساب کاربری خود شوید");
				break;
			}
			case 403: {
				toast("دسترسی غیر مجاز");
				break;
			}
			case 500: {
				toast("خطایی در سرور رخ داده است");
				break;
			}
		}
		return Promise.reject(error);
	},
);

export default api;
