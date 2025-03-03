import { z } from "zod";

export const createContatoSchema = z.object({
  nome: z.string({
    required_error: "Nome é obrigatório.",
  }),

  valor: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .refine((val) => /^\+?[1-9]\d{1,14}$/.test(val), {
      message: "Contato deve ser um número de telefone válido.",
    }),
});
