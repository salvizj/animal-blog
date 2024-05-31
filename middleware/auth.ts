export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = useSupabaseUser().value;
	const privateRoutes = ['/logout', '/my-posts', '/make-post', '/profile'];
	const authRoutes = ['/login', '/register'];

	if (user && authRoutes.includes(to.path)) {
		return '/';
	}

	if (!user && privateRoutes.includes(to.path)) {
		return '/login';
	}
});
