import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoadingBarProvider } from "./context/LoadingBarContext.jsx";
import { queryClient } from "./lib/queryClient.js";
import AppErrorBoundary from "./components/shared/AppErrorBoundary.jsx";
import "./index.css";

document.getElementById("seo-prerender")?.remove();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<LoadingBarProvider>
					<AppErrorBoundary>
						<App />
					</AppErrorBoundary>
				</LoadingBarProvider>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>,
);
