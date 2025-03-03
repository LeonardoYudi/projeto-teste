export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const authToken = authStore.getAccessToken();
  const tokenLocalStorage = JSON.parse(
    window?.localStorage?.getItem("token") || "{}"
  );

  if (!authToken && to.path !== "/") {
    if (tokenLocalStorage?.email) {
      authStore.setEmail(tokenLocalStorage.email);
    }

    if (tokenLocalStorage?.token?.access_token) {
      authStore.setToken(tokenLocalStorage.token);
    } else {
      authStore.logout();
    }
  }

  if (to.path === "/" && (authToken || tokenLocalStorage?.token)) {
    return navigateTo("/usuarios");
  }
});
