import { z } from "zod";

export const createTipoScheama = z.object({
  descricao: z
    .string({
      required_error: "Descrição do tipo é obrigatória.",
    })
    .min(2, {
      message: "Descrição do tipo deve ter pelo menos 2 caracteres.",
    }),
});
