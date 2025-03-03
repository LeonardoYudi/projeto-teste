import { z } from "zod";

export const createUserScheama = z.object({
  nome: z
    .string({
      required_error: "Nome do usuário é obrigatório.",
    })
    .min(2, {
      message: "O nome de usuário deve ter pelo menos 2 caracteres.",
    }),

  email: z.string({ required_error: "O campo email é obrigatório." }).email({
    message: "Email inválido.",
  }),

  senha: z
    .string({
      required_error: "Senha é obrigatória.",
    })
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
});
