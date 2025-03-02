import { z } from "zod";

export const createTipoScheama = z.object({
  descricao: z
    .string({
      required_error: "Descricao is required.",
    })
    .min(2, {
      message: "Descricao must be at least 2 characters.",
    }),
});
