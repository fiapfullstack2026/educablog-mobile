import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { postSchema, type PostFormData } from "../schemas/postSchema";
import { createPost } from "../services/postsService";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/authSlice";
import type { ApiError } from "@/types/api.types";

function getErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (err.code === "ECONNABORTED") {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (!err.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }
    if (err.response.status === 403) {
      return "Apenas professores podem publicar posts.";
    }
    return err.response.data?.message ?? "Erro ao publicar o post.";
  }
  return "Erro inesperado. Tente novamente.";
}

/**
 * Formulário de criação de post; `onSuccess` roda após a publicação.
 */
export function useCreatePost(onSuccess: () => void) {
  const user = useAppSelector(selectUser);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    // Professor logado como autor padrão
    defaultValues: {
      title: "",
      discipline: "",
      teacher: user?.username ?? "",
      content: "",
    },
  });

  const onSubmit = async (data: PostFormData) => {
    setApiError(null);
    try {
      await createPost(data);
      resetForm();
      onSuccess();
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
