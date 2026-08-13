import { createContext, useCallback, useContext, useMemo, useState } from "react";

const LoadingBarContext = createContext(null);

export function LoadingBarProvider({ children }) {
	const [count, setCount] = useState(0);

	const start = useCallback(() => setCount((previousCount) => previousCount + 1), []);
	const stop = useCallback(() => setCount((previousCount) => Math.max(0, previousCount - 1)), []);

	const value = useMemo(
		() => ({ isLoading: count > 0, start, stop }),
		[count, start, stop],
	);

	return (
		<LoadingBarContext.Provider value={value}>
			{children}
		</LoadingBarContext.Provider>
	);
}

export function useLoadingBar() {
	const context = useContext(LoadingBarContext);
	return context || { isLoading: false, start: () => {}, stop: () => {} };
}
