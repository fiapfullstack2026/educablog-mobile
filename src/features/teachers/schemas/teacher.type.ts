export interface Teacher {
  _id: string;
  username: string;
  isTeacher: boolean;
  createdAt: string;
}

/** Corpo do PUT /user/:id — envia apenas os campos alterados */
export interface UpdateTeacherRequest {
  username?: string;
  password?: string;
  isTeacher?: boolean;
}
