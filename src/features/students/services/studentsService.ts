import { api } from "@/lib/axios";

export interface Student {
  _id: string;
  username: string;
  isTeacher: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}

export async function getStudents(): Promise<Student[]> {
  const { data } = await api.get<ApiResponse<Student[]>>(
    "/user/?isTeacher=false",
  );

  return data.data;
}

export async function getStudentById(id: string): Promise<Student> {
  const { data } = await api.get<ApiResponse<Student>>(`/user/${id}`);
  return data.data;
}

export async function updateStudent(
  id: string,
  payload: { username: string },
): Promise<void> {
  await api.put(`/user/${id}`, payload);
}
