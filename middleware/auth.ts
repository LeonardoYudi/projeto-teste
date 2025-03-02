export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (authStore.getAccessToken() === "") {
    const tokenLocalStorage = computed(() =>
      JSON.parse(window?.localStorage?.getItem("token") || "{}")
    );
    if (tokenLocalStorage.value?.token?.access_token) {
      authStore.setToken(tokenLocalStorage.value.token);
    } else {
      authStore.logout();
    }
  }
});
