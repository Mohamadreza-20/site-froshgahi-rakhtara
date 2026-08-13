import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoadingBarProvider } from "./context/LoadingBarContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<LoadingBarProvider>
				<App />
			</LoadingBarProvider>
		</AuthProvider>
	</StrictMode>,
);
