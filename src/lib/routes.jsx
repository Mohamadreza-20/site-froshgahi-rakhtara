import { createBrowserRouter, redirect, Outlet, ScrollRestoration } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import AppLayout from "../components/layouts/AppLayout";
import CMSLayout from "../components/layouts/CMSLayout";

const HomePage = lazy(() => import("../pages/HomePage"));
const AllProductsPage = lazy(() => import("../pages/AllProductsPage"));
const AboutUsPage = lazy(() => import("../pages/AboutUSPage"));
const ContactUsPage = lazy(() => import("../pages/ContactUSPage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Forbidden = lazy(() => import("../pages/Forbidden"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/Products"));
const Users = lazy(() => import("../pages/Users"));
const CmsComments = lazy(() => import("../pages/CmsComments"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const AccountPage = lazy(() => import("../pages/AccountPage"));
import RouteErrorPage from "../pages/RouteErrorPage";

function RouteLoadingFallback() {
	return (
		<div className="min-h-[40vh] flex items-center justify-center px-6 py-12" role="status" aria-live="polite">
			<div className="h-10 w-10 rounded-full border-4 border-forest/15 border-t-forest animate-spin" aria-hidden="true" />
			<span className="sr-only">در حال بارگذاری صفحه</span>
		</div>
	);
}

function RootLayout() {
	return (
		<>
			<ScrollRestoration />
			<Toaster
				position="top-center"
				dir="rtl"
				richColors
				closeButton
				toastOptions={{
					style: { fontFamily: "Vazirmatn, sans-serif", textAlign: "right" },
				}}
			/>
			<Suspense fallback={<RouteLoadingFallback />}>
				<Outlet />
			</Suspense>
		</>
	);
}

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		errorElement: <RouteErrorPage />,
		children: [
			{
				path: "/",
				element: <AppLayout />,
				children: [
					{ index: true, element: <HomePage /> },
					{ path: "products", element: <AllProductsPage /> },
					{ path: "about-us", element: <AboutUsPage /> },
					{ path: "contact-us", element: <ContactUsPage /> },
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
