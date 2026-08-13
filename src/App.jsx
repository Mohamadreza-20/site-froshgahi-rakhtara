import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes.jsx";

export default function App() {
	return <RouterProvider router={router} />;
}
