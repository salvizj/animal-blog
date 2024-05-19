export default defineNuxtRouteMiddleware(async (to, from) => {
  const  user  = useSupabaseUser();

  if (!user && to.path !== '/login') {
    return '/login';
  }
});
