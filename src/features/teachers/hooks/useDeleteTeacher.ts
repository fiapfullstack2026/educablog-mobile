import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { isAxiosError } from "axios";

import type { ApiError } from "@/types/api.types";

import type { Teacher } from "../schemas/teacher.type";
import { deleteTeacher } from "../services/teachersService";

const FAILURE_MESSAGE = "Não foi possível excluir o professor.";

function getErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (err.response?.status === 403) {
      return "Você não tem permissão para excluir professores.";
    }

    return err.response?.data?.message ?? FAILURE_MESSAGE;
  }

  return FAILURE_MESSAGE;
}

/** Confirma e exclui um professor via DELETE /user/:id */
export function useDeleteTeacher(onDeleted?: (id: string) => void) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const remove = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await deleteTeacher(id);
        onDeleted?.(id);
      } catch (err) {
        Alert.alert("Erro", getErrorMessage(err));
      } finally {
        setDeletingId(null);
      }
    },
    [onDeleted],
  );

  const confirmDelete = useCallback(
    (teacher: Teacher) => {
      Alert.alert(
        "Excluir professor",
        `Tem certeza que deseja excluir ${teacher.username}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: () => void remove(teacher._id),
          },
        ],
      );
    },
    [remove],
  );

  return { deletingId, confirmDelete };
}
