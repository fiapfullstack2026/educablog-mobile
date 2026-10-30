import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, updateUser } from "@/store/authSlice";
import type { ApiError } from "@/types/api.types";

import type { Teacher, UpdateTeacherRequest } from "../schemas/teacher.type";
import {
  editTeacherSchema,
  type EditTeacherFormData,
} from "../schemas/teacherSchema";
import { getTeacherById, updateTeacher } from "../services/teachersService";

function getLoadErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (!err.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }
    if (err.response.status === 404) {
      return "Professor não encontrado.";
    }
    return err.response.data?.message ?? "Erro ao carregar o professor.";
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
      return "Apenas professores podem editar outros usuários.";
    }
    if (err.response.status === 404) {
      return "Este professor não existe mais.";
    }
    if (err.response.status === 409) {
      return "Já existe um usuário com este nome e perfil.";
    }
    return err.response.data?.message ?? "Erro ao salvar o professor.";
  }
  return "Erro inesperado. Tente novamente.";
}

/** Monta o PUT apenas com o que mudou; senha em branco não é enviada */
function toPayload(
  teacher: Teacher,
  data: EditTeacherFormData,
): UpdateTeacherRequest {
  const payload: UpdateTeacherRequest = {};

  if (data.username !== teacher.username) payload.username = data.username;
  if (data.password) payload.password = data.password;
  if (data.isTeacher !== teacher.isTeacher) payload.isTeacher = data.isTeacher;

  return payload;
}

/**
 * Formulário de edição de professor: carrega o usuário (GET /user/:id),
 * pré-preenche os campos e salva via PUT /user/:id.
 */
export function useEditTeacher(teacherId: string, onSuccess: () => void) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loadingTeacher, setLoadingTeacher] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<EditTeacherFormData>({
    resolver: zodResolver(editTeacherSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      isTeacher: true,
    },
  });

  const load = useCallback(
    async (isActive: () => boolean = () => true) => {
      setLoadingTeacher(true);
      setLoadError(null);

      try {
        const result = await getTeacherById(teacherId);
        if (!isActive()) return;

        setTeacher(result);
        resetForm({
          username: result.username,
          password: "",
          confirmPassword: "",
          isTeacher: result.isTeacher ?? false,
        });
      } catch (err) {
        if (isActive()) setLoadError(getLoadErrorMessage(err));
      } finally {
        if (isActive()) setLoadingTeacher(false);
      }
    },
    [teacherId, resetForm],
  );

  useEffect(() => {
    let active = true;

    void load(() => active);

    return () => {
      active = false;
    };
  }, [load]);

  // O usuário logado não pode trocar o próprio perfil (perderia o acesso a esta área)
  const isCurrentUser =
    !!teacher && teacher.username === currentUser?.username;

  const onSubmit = async (data: EditTeacherFormData) => {
    if (!teacher) return;

    setApiError(null);

    const payload = toPayload(teacher, {
      ...data,
      isTeacher: isCurrentUser ? teacher.isTeacher : data.isTeacher,
    });

    if (Object.keys(payload).length === 0) {
      onSuccess();
      return;
    }

    try {
      await updateTeacher(teacher._id, payload);

      if (isCurrentUser && payload.username) {
        dispatch(updateUser({ username: payload.username }));
      }

      onSuccess();
    } catch (err) {
      setApiError(getSaveErrorMessage(err));
    }
  };

  return {
    control,
    errors,
    isCurrentUser,
    loadingTeacher,
    loadError,
    retry: () => void load(),
    error: apiError,
    loading: isSubmitting,
    submit: handleSubmit(onSubmit),
  };
}
