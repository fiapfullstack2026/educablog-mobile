import { api } from "@/lib/axios";
import type { ApiListResponse, ApiResponse } from "@/types/api.types";
import type {
  Teacher,
  UpdateTeacherRequest,
} from "../schemas/teacher.type";

// A API monta o recurso de usuários em /user (mesmo prefixo de /user/signin)

/**
 * Lista apenas os usuários com perfil de professor.
 * GET /user?isTeacher=true
 */
export async function getTeachers(): Promise<Teacher[]> {
  const { data } = await api.get<ApiListResponse<Teacher>>("/user", {
    params: { isTeacher: true },
  });

  return data.data ?? [];
}

/**
 * Busca um professor pelo ID.
 * GET /user/:id
 */
export async function getTeacherById(id: string): Promise<Teacher> {
  const { data } = await api.get<ApiResponse<Teacher>>(
    `/user/${encodeURIComponent(id)}`,
  );

  return data.data;
}

/**
 * Atualiza um professor (próprio usuário ou professores).
 * PUT /user/:id — responde 204 sem corpo; a API faz o hash da senha
 */
export async function updateTeacher(
  id: string,
  payload: UpdateTeacherRequest,
): Promise<void> {
  await api.put(`/user/${encodeURIComponent(id)}`, payload);
}

/**
 * Exclui um professor (apenas professores).
 * DELETE /user/:id — responde 204 sem corpo
 */
export async function deleteTeacher(id: string): Promise<void> {
  await api.delete(`/user/${encodeURIComponent(id)}`);
}
