import { useEffect, useState } from "react";

export function usePersistentState(key, defaultValue, validate) {
	const [state, setState] = useState(() => {
		try {
			const raw = localStorage.getItem(key);
			if (raw === null) return defaultValue;
			const parsed = JSON.parse(raw);
			if (validate && !validate(parsed)) return defaultValue;
			return parsed;
		} catch {
			return defaultValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(state));
		} catch {
		}
	}, [key, state]);

	return [state, setState];
}
