export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = useSupabaseUser().value;
	const privateRoutes = ['/logout', '/my-posts', '/make-post'];
	const authRoutes = ['/login', '/register'];
	const allRoutes = [
		'/about',
		'/logout',
		'/posts',
		'/my-posts',
		'/',
		'/login',
		'/register',
		'/make-post',
	];
	if (user && authRoutes.includes(to.path)) {
		return '/';
	}
	if (!user && privateRoutes.includes(to.path)) {
		return '/login';
	}
});
