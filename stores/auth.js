import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
	const isLoggedIn = useSupabaseUser();

	const login = () => {
		isLoggedIn.value = true;
	};

	const logout = () => {
		isLoggedIn.value = false;
	};

	return {
		isLoggedIn,
		login,
		logout,
	};
});
