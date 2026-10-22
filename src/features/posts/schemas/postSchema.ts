import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Informe o título.")
    .max(400, "O título deve ter no máximo 400 caracteres."),
  discipline: z.string().trim().min(1, "Selecione a disciplina."),
  teacher: z.string().trim().min(1, "Informe o professor."),
  content: z.string().trim().min(1, "Informe o conteúdo."),
});

export type PostFormData = z.infer<typeof postSchema>;
