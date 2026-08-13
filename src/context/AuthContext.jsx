import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "nemonekar_auth_user";

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	});

	useEffect(() => {
		try {
			if (user) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
			} else {
				localStorage.removeItem(STORAGE_KEY);
			}
		} catch {
		}
	}, [user]);

	const signIn = useCallback((userData) => {
		setUser(userData);
	}, []);

	const signOut = useCallback(() => {
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

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return ctx;
}
