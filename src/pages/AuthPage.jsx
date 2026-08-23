import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuthContext } from "../context/AuthContext";
import { usePageMeta } from "../lib/hooks/usePageMeta";

export default function AuthPage() {
	usePageMeta({ title: "ورود و ثبت‌نام | Rakhtara", description: "ورود یا ثبت‌نام در حساب کاربری Rakhtara.", path: "/auth", robots: "noindex, nofollow" });
	const location = useLocation();
	const { user, isAuthenticated } = useAuthContext();
	const [tab, setTab] = useState(
		location.state?.tab === "register" ? "register" : "login",
	);
	const navigate = useNavigate();
	const routeByRole = () => {
		navigate("/", { replace: true });
	};

	useEffect(() => {
		if (isAuthenticated && location.pathname === "/auth") {
			navigate("/", { replace: true });
		}
	}, [isAuthenticated, location.pathname, navigate]);

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
