import { z } from "zod";

export const createContatoSchema = z.object({
  idtipo: z.number({
    required_error: "Id tipo é obrigatório.",
  }),

  idusuario: z.number({
    required_error: "Id usuario é obrigatório.",
  }),

  nome: z.string({
    required_error: "Nome é obrigatório.",
  }),

  valor: z.string({
    required_error: "Valor é obrigatório.",
  }),
});
