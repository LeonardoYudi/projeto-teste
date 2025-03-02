import type { UseFetchOptions } from "@vueuse/core";

interface ExtendedUseFetchOptions extends UseFetchOptions {
  headers?: Record<string, string>;
}

export function useApiFetch<T>(
  path: string,
  options: ExtendedUseFetchOptions = {}
) {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore(); // Assumindo que você usa Pinia/Vuex para gerenciar autenticação
  const router = useRouter();

  return useFetch<T>(`${runtimeConfig.public.urlAPI}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${authStore.getAccessToken}`, // Inclui o token automaticamente
      "Content-Type": "application/json",
      ...(options.headers || {}), // Permite sobrescrever headers se necessário
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        console.warn("Sessão expirada. Redirecionando para login...");

        // router.push("/login"); // Redireciona para a página de login
      }
    },
  });
}
