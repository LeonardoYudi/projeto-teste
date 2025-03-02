import { defineStore } from "pinia";

type TokenType = "bearer";

interface Token {
  access_token: string;
  type_token: TokenType;
}

export const useAuthStore = defineStore("auth", () => {
  const state = ref<Token | null>({
    access_token: "",
    type_token: "bearer",
  });

  const setToken = (token: Token) => {
    state.value = token;
  };

  const getAccessToken = () => {
    return state.value?.access_token;
  };

  const logout = () => {
    state.value = null;
    window?.localStorage.removeItem("token");
    navigateTo("/");
  };

  return {
    setToken,
    getAccessToken,
    logout,
  };
});
