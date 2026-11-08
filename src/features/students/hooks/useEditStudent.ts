import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";

import type { ApiError } from "@/types/api.types";

import {
  editTeacherSchema,
  type EditTeacherFormData,
} from "../../teachers/schemas/teacherSchema";

import {
  getStudentById,
  updateStudent,
  type Student,
  type UpdateStudentRequest,
} from "../services/studentsService";

function getErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (err.code === "ECONNABORTED") {
      return "O servidor demorou para responder. Tente novamente.";
    }

    if (!err.response) {
      return "Não foi possível conectar ao servidor.";
    }

    if (err.response.status === 403) {
      return "Você não tem permissão para editar este usuário.";
    }

    if (err.response.status === 404) {
      return "Usuário não encontrado.";
    }

    if (err.response.status === 409) {
      return "Já existe um usuário com esses dados.";
    }

    return err.response.data?.message ?? "Erro ao salvar usuário.";
  }

  return "Erro inesperado. Tente novamente.";
}

export function useEditStudent(studentId: string, onSuccess: () => void) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditTeacherFormData>({
    resolver: zodResolver(editTeacherSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      isTeacher: false,
    },
  });

  const load = useCallback(
    async (isActive: () => boolean = () => true) => {
      setLoadingStudent(true);
      setLoadError(null);

      try {
        const result = await getStudentById(studentId);

        if (!isActive()) return;

        if (result.isTeacher) {
          setLoadError("Este usuário não é um aluno.");
          return;
        }

        setStudent(result);

        reset({
          username: result.username,
          password: "",
          confirmPassword: "",
          isTeacher: false,
        });
      } catch (err) {
        if (isActive()) {
          setLoadError(getErrorMessage(err));
        }
      } finally {
        if (isActive()) {
          setLoadingStudent(false);
        }
      }
    },
    [studentId, reset],
  );

  useEffect(() => {
    let active = true;

    void load(() => active);

    return () => {
      active = false;
    };
  }, [load]);

  const onSubmit = async (data: EditTeacherFormData) => {
    if (!student) return;

    const payload: UpdateStudentRequest = {};

    if (data.username !== student.username) {
      payload.username = data.username;
    }

    if (data.password) {
      payload.password = data.password;
    }

    if (data.isTeacher !== student.isTeacher) {
      payload.isTeacher = data.isTeacher;
    }

    if (Object.keys(payload).length === 0) {
      onSuccess();
      return;
    }

    try {
      setApiError(null);

      await updateStudent(studentId, payload);

      onSuccess();
    } catch (err) {
      setApiError(getErrorMessage(err));
    }
  };

  return {
    control,
    errors,
    loadingStudent,
    loadError,
    retry: () => void load(),
    error: apiError,
    loading: isSubmitting,
    submit: handleSubmit(onSubmit),
  };
}
