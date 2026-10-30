import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";

import type { ApiError } from "@/types/api.types";

import type { Teacher } from "../schemas/teacher.type";
import { getTeachers } from "../services/teachersService";

function getErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (err.code === "ECONNABORTED") {
      return "O servidor demorou para responder. Tente novamente.";
    }

    if (!err.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }

    if (err.response.status === 403) {
      return "Acesso restrito a professores.";
    }

    return err.response.data?.message ?? "Erro ao carregar os professores.";
  }

  return "Erro inesperado. Tente novamente.";
}

/** Carrega a lista de professores via GET /user?isTeacher=true */
export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);

    try {
      setTeachers(await getTeachers());
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    void load().finally(() => setLoading(false));
  }, [load]);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  const removeTeacher = useCallback((id: string) => {
    setTeachers((current) => current.filter((teacher) => teacher._id !== id));
  }, []);

  return { teachers, loading, refreshing, error, refresh, removeTeacher };
}
