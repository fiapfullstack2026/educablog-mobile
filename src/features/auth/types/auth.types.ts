// Espelho exato dos tipos do web
export interface User {
  username: string;
  isTeacher: boolean;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  isTeacher?: boolean;
}
