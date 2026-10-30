import { z } from "zod";

// Senha em branco na edição mantém a senha atual
export const editTeacherSchema = z
  .object({
    username: z.string().trim().min(1, "Informe o usuário."),
    password: z.string(),
    confirmPassword: z.string(),
    isTeacher: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

export type EditTeacherFormData = z.infer<typeof editTeacherSchema>;
