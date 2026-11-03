import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { isAxiosError } from "axios";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/authSlice";
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

/**
 * Confirma e exclui um professor via DELETE /user/:id.
 * Se for a própria conta, encerra a sessão após a exclusão.
 */
export function useDeleteTeacher(onDeleted?: (id: string) => void) {
  const currentUser = useAppSelector(selectUser);
  const { signOut } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const remove = useCallback(
    async (teacher: Teacher, isSelf: boolean) => {
      setDeletingId(teacher._id);

      try {
        await deleteTeacher(teacher._id);
      } catch (err) {
        Alert.alert("Erro", getErrorMessage(err));
        setDeletingId(null);
        return;
      }

      // A conta não existe mais: volta para o login
      if (isSelf) {
        await signOut();
        return;
      }

      setDeletingId(null);
      onDeleted?.(teacher._id);
    },
    [onDeleted, signOut],
  );

  const confirmDelete = useCallback(
    (teacher: Teacher) => {
      const isSelf = teacher.username === currentUser?.username;

      Alert.alert(
        isSelf ? "Excluir minha conta" : "Excluir professor",
        isSelf
          ? "Tem certeza que deseja excluir a sua conta? Você será desconectado e não poderá mais acessar o EducaBlog com este usuário."
          : `Tem certeza que deseja excluir ${teacher.username}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: () => void remove(teacher, isSelf),
          },
        ],
      );
    },
    [currentUser?.username, remove],
  );

  return { deletingId, confirmDelete };
}
