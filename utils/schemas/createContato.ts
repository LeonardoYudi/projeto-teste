import { z } from "zod";

export const createContatoSchema = z.object({
  idtipo: z.number({
    required_error: "idtipo is required.",
  }),

  idusuario: z.number({
    required_error: "idusuario is required.",
  }),

  nome: z.string({
    required_error: "nome is required.",
  }),

  valor: z.string({
    required_error: "valor is required.",
  }),
});
