import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";

import { useAppDispatch } from "@/store/hooks";
import type { ApiError } from "@/types/api.types";

import { getDiscipline, NEUTRAL_DISCIPLINE } from "../constants/disciplines";
import { patchPost } from "../postSlice";
import { postSchema, type PostFormData } from "../schemas/postSchema";
import { getPostById, updatePost } from "../services/postsService";
import type { Post } from "../types/post.types";
import { htmlToEditableText } from "../utils/htmlToPlainText";

function getLoadErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (!err.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }
    if (err.response.status === 404) {
      return "Post não encontrado.";
    }
    return err.response.data?.message ?? "Erro ao carregar o post.";
  }
  return "Erro inesperado. Tente novamente.";
}

function getSaveErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (err.code === "ECONNABORTED") {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (!err.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }
    if (err.response.status === 403) {
      return "Apenas professores podem editar posts.";
    }
    if (err.response.status === 404) {
      return "Este post não existe mais.";
    }
    return err.response.data?.message ?? "Erro ao salvar o post.";
  }
  return "Erro inesperado. Tente novamente.";
}

/** Valores do formulário a partir do post salvo na API */
function toFormData(post: Post): PostFormData {
  const discipline = getDiscipline(post.discipline);

  return {
    title: post.title ?? "",
    // Disciplina fora da lista é mantida como veio, para não ser perdida
    discipline:
      discipline === NEUTRAL_DISCIPLINE ? post.discipline ?? "" : discipline.label,
    teacher: post.teacher || post.author || "",
    content: htmlToEditableText(post.content),
  };
}

/**
 * Formulário de edição de post: carrega o post (GET /posts/:id),
 * pré-preenche os campos e salva via PUT /posts/:id.
 */
export function useEditPost(postId: string, onSuccess: () => void) {
  const dispatch = useAppDispatch();

  const [post, setPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Texto exibido no campo ao abrir; se não mudar, o HTML original é mantido
  const initialContent = useRef("");

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", discipline: "", teacher: "", content: "" },
  });

  const load = useCallback(
    async (isActive: () => boolean = () => true) => {
      setLoadingPost(true);
      setLoadError(null);

      try {
        const result = await getPostById(postId);
        if (!isActive()) return;

        const values = toFormData(result);
        initialContent.current = values.content.trim();
        setPost(result);
        resetForm(values);
      } catch (err) {
        if (isActive()) setLoadError(getLoadErrorMessage(err));
      } finally {
        if (isActive()) setLoadingPost(false);
      }
    },
    [postId, resetForm],
  );

  useEffect(() => {
    let active = true;

    void load(() => active);

    return () => {
      active = false;
    };
  }, [load]);

  const onSubmit = async (data: PostFormData) => {
    if (!post) return;

    setApiError(null);

    // Evita trocar a formatação HTML (criada no web) por texto puro sem necessidade
    const payload = {
      ...data,
      content:
        data.content === initialContent.current ? post.content : data.content,
    };

    try {
      await updatePost(post._id, payload);
      dispatch(
        patchPost({
          id: post._id,
          changes: { ...payload, updatedAt: new Date().toISOString() },
        }),
      );
      onSuccess();
    } catch (err) {
      setApiError(getSaveErrorMessage(err));
    }
  };

  return {
    control,
    errors,
    loadingPost,
    loadError,
    retry: () => void load(),
    error: apiError,
    loading: isSubmitting,
    submit: handleSubmit(onSubmit),
  };
}
