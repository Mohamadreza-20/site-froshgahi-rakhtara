import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { STORAGE_KEYS } from "../lib/storageKeys";

const AuthContext = createContext(null);

const STORAGE_KEY = STORAGE_KEYS.authUser;

function readStoredUser() {
	try {
		const remembered = localStorage.getItem(STORAGE_KEY);
		if (remembered) return { user: JSON.parse(remembered), remember: true };

		const sessionUser = sessionStorage.getItem(STORAGE_KEY);
		if (sessionUser) return { user: JSON.parse(sessionUser), remember: false };
	} catch {
	}

	return { user: null, remember: false };
}

export function AuthProvider({ children }) {
	const initial = readStoredUser();
	const [user, setUser] = useState(initial.user);
	const rememberRef = useRef(initial.remember);

	useEffect(() => {
		try {
			localStorage.removeItem(STORAGE_KEY);
			sessionStorage.removeItem(STORAGE_KEY);

			if (!user) return;

			const storage = rememberRef.current ? localStorage : sessionStorage;
			storage.setItem(STORAGE_KEY, JSON.stringify(user));
		} catch {
		}
	}, [user]);

	const signIn = useCallback((userData, remember = true) => {
		rememberRef.current = Boolean(remember);
		setUser(userData);
	}, []);

	const signOut = useCallback(() => {
		rememberRef.current = false;
		setUser(null);
	}, []);

	const updateUser = useCallback((partialUser) => {
		setUser((prev) => (prev ? { ...prev, ...partialUser } : prev));
	}, []);

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: Boolean(user),
			signIn,
			signOut,
			updateUser,
		}),
		[user, signIn, signOut, updateUser],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return ctx;
}
