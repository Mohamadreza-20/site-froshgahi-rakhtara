import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 2 * 60_000,
			gcTime: 30 * 60_000,
			refetchOnReconnect: true,
			refetchOnWindowFocus: false,
			retry: 1,
			structuralSharing: true,
		},
		mutations: {
			retry: 0,
		},
	},
});
