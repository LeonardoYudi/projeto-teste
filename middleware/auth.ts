export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  let authToken = authStore.getAccessToken();

  const tokenLocalStorage = JSON.parse(
    window?.localStorage?.getItem("token") || "{}"
  );

  if (!authToken && tokenLocalStorage?.token?.access_token) {
    authStore.setToken(tokenLocalStorage.token);
    authToken = authStore.getAccessToken();
    if (tokenLocalStorage?.email) {
      authStore.setEmail(tokenLocalStorage.email);
    }
  }

  if (!authToken && to.path !== "/") {
    return navigateTo("/");
  }

  if (to.path === "/" && authToken) {
    return navigateTo("/usuarios");
  }
});
