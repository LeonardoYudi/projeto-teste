import { z } from "zod";

export const createUserScheama = z.object({
  nome: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  email: z.string().email({
    message: "Email inválido",
  }),

  senha: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});
