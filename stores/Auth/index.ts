import { defineStore } from "pinia";

type TokenType = "bearer";
interface AuthToken {
  access_token: string;
  type_token: TokenType;
}

export const useAuthStore = defineStore("auth", () => {
  const state = ref({
    access_token: "",
    type_token: "bearer",
    emailUser: "",
  });

  const setToken = (token: AuthToken) => {
    state.value.access_token = token.access_token;
    state.value.type_token = token.type_token;
  };

  const getAccessToken = () => {
    return state.value?.access_token;
  };

  const setEmail = (email: string) => {
    state.value.emailUser = email;
  };

  const getEmail = () => {
    return state.value?.emailUser;
  };

  const logout = () => {
    state.value = {
      access_token: "",
      type_token: "bearer",
      emailUser: "",
    };

    window?.localStorage.removeItem("token");
    navigateTo("/");
  };

  return {
    setToken,
    getAccessToken,
    setEmail,
    getEmail,
    logout,
  };
});
