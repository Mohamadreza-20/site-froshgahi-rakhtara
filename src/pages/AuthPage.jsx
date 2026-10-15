import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuthContext } from "../context/AuthContext";
import { canAccessPanel } from "../lib/roles";

export default function AuthPage() {
	const location = useLocation();
	const { user, isAuthenticated } = useAuthContext();
	const [tab, setTab] = useState(
		location.state?.tab === "register" ? "register" : "login",
	);
	const navigate = useNavigate();
	const routeByRole = () => {
		navigate(location.state?.from || "/");
	};

	useEffect(() => {
		if (isAuthenticated) {
			toast("شما قبلاً وارد حساب کاربری خود شده‌اید");
			navigate(canAccessPanel(user) ? "/dashboard/home" : "/account", {
				replace: true,
			});
		}
	}, []);

	return (
		<AuthLayout tab={tab} setTab={setTab}>
			{tab === "login" ? (
				<LoginForm onSuccess={routeByRole} />
			) : (
				<RegisterForm onSuccess={routeByRole} />
			)}
		</AuthLayout>
	);
}
