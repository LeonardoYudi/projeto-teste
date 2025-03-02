import { useFetch } from "#app";
import { loginSchema } from "~/utils/schemas/auth";

interface LoginPayload {
  email: string;
  password: string;
}

export function useAuth() {
  const login = async (payload: LoginPayload) => {
    // Limpa erros anteriores
    let errorZod = null;
    let errorApi = null;

    // Validação com Zod
    const result = loginSchema.safeParse(payload);
    if (!result.success) {
      errorZod = result.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {} as Record<string, string>);
      return { errorZod, errorApi };
    }

    try {
      const { data, error } = await useFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: payload.email,
          password: payload.password,
        }).toString(),
      });

      if (error.value) {
        errorApi = error.value?.data?.detail || "Erro ao autenticar";
        return { errorZod, errorApi };
      }

      return { data: data.value, errorZod, errorApi };
    } catch (e) {
      errorApi = e instanceof Error ? e.message : "Erro desconhecido";
      return { errorZod, errorApi };
    }
  };

  return { login };
}
