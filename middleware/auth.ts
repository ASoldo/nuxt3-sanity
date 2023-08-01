export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  if (!user.value && to.path === "/game") {
    return navigateTo("/");
  }
  if (!user.value && to.path === "/profile") {
    return navigateTo("/");
  }
  if (!user.value && to.path === "/prizes") {
    return navigateTo("/");
  }
});
