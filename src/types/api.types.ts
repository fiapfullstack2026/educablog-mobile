// Espelho dos tipos do web — sem alterações de contrato
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface ApiError {
  success: false;
  message: string;
}
