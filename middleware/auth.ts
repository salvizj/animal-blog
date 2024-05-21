export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser().value;
  const privateRoutes = ['/about', '/logout'];
  const authRoutes = ['/login', '/register'];

  // If the user is authenticated and tries to access an auth route, redirect to the home page.
  if (user && authRoutes.includes(to.path)) {
    return '/';
  }

  // If the user is not authenticated and tries to access a private route, redirect to the login page.
  if (!user && privateRoutes.includes(to.path)) {
    return '/login';
  }
});
