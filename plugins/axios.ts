import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { useToast } from "@/components/ui/toast/use-toast";

export default defineNuxtPlugin((nuxtApp) => {
  const storeAuth = useAuthStore();
  const runTime = useRuntimeConfig();
  const { toast } = useToast();
  const token = computed(() => storeAuth.getAccessToken());

  const configAxios = axios.create({
    baseURL: runTime.public.urlAPI,
    timeout: 10000,
  });

  configAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers = config.headers || {};
      if (token.value !== "") {
        config.headers.Authorization = `Bearer ${token.value}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  configAxios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: any) => {
      if (error.status === 401) {
        toast({
          title: "Erro",
          duration: 3000,
          variant: "destructive",
          description: "Credenciais inválidas ou token expirado",
        });

        storeAuth.logout();
      }
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("configAxios", configAxios);
});
