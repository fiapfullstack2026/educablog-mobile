import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { authenticate } from "../services/authService";
import { useAppDispatch } from "@/store/hooks";
import { signIn as signInAction } from "@/store/authSlice";
import type { ApiError } from "@/types/api.types";

function getErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (err.code === "ECONNABORTED") {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (!err.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }
    if (err.response.status === 401) {
      return "Usuário ou senha inválidos.";
    }
    return err.response.data?.message ?? "Erro ao entrar. Tente novamente.";
  }
  if (err instanceof Error && err.message === "INVALID_TOKEN") {
    return "Resposta inválida do servidor. Tente novamente.";
  }
  return "Erro inesperado. Tente novamente.";
}

export function useLogin() {
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    try {
      const { token, user } = await authenticate(data);
      dispatch(signInAction({ token, user }));
    } catch (err) {
      setApiError(getErrorMessage(err));
    }
  };

  const reset = useCallback(() => {
    resetForm();
    setApiError(null);
  }, [resetForm]);

  return {
    control,
    errors,
    error: apiError,
    loading: isSubmitting,
    submit: handleSubmit(onSubmit),
    reset,
  };
}
