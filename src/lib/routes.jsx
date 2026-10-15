import { createBrowserRouter, redirect, Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import HomePage from "../pages/HomePage";
import AllProductsPage from "../pages/AllProductsPage";
import AboutUSPage from "../pages/AboutUSPage";
import ContactUSPage from "../pages/ContactUSPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CategoryPage from "../pages/CategoryPage";
import NotFound from "../pages/NotFound";
import Forbidden from "../pages/Forbidden";
import CMSLayout from "../components/layouts/CMSLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Users from "../pages/Users";
import CmsComments from "../pages/CmsComments";
import AuthPage from "../pages/AuthPage";
import AccountPage from "../pages/AccountPage";

function RootLayout() {
	return (
		<>
			<ScrollRestoration />
			<Outlet />
		</>
	);
}

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		errorElement: <Navigate to="/" replace />,
		children: [
			{
				path: "/",
				element: <AppLayout />,
				children: [
					{ index: true, element: <HomePage /> },
					{ path: "products", element: <AllProductsPage /> },
					{ path: "about-us", element: <AboutUSPage /> },
					{ path: "contact-us", element: <ContactUSPage /> },
					{ path: "product/:id", element: <ProductDetailPage /> },
					{ path: "category/:id", element: <CategoryPage /> },
					{ path: "account", element: <AccountPage /> },
					{ path: "forbidden", element: <Forbidden /> },
					{ path: "*", element: <NotFound /> },
				],
			},
			{
				path: "/auth",
				element: <AuthPage />,
			},
			{
				path: "/dashboard",
				element: <CMSLayout />,
				children: [
					{ index: true, loader: () => redirect("/") },
					{ path: "home", element: <Dashboard /> },
					{ path: "users", element: <Users /> },
					{ path: "products", element: <Products /> },
					{ path: "comments", element: <CmsComments /> },
				],
			},
		],
	},
]);
