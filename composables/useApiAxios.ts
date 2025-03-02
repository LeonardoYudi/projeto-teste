import type { AxiosRequestConfig, Method } from "axios";

interface ApiConfig {
  route?: string;
  headers?: Record<string, string>;
  method: Method;
  timeout?: number;
}

export const useApiAxios = (config: ApiConfig) => {
  const { $configAxios } = useNuxtApp();

  const data = ref(null);
  const loading = ref(false);
  const error = ref<any | null>(null);

  const execute = async (body?: any, options?: AxiosRequestConfig) => {
    try {
      loading.value = true;
      error.value = null;
      data.value = null;

      const res = await $configAxios({
        url: config.route,
        method: config.method,
        data: body,
        headers: config.headers,
        timeout: config.timeout,
        ...options,
      });

      data.value = res.data;
    } catch (e: any) {
      error.value = e.response?.data;
    } finally {
      loading.value = false;
    }
  };

  return {
    data: computed<any>(() => data.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    execute,
  };
};
