import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { isAxiosError } from "axios";

import { useAppDispatch } from "@/store/hooks";
import type { ApiError } from "@/types/api.types";

import { removePost } from "../postSlice";
import { deletePost } from "../services/postsService";

const CONFIRM_MESSAGE = "Tem certeza que deseja excluir este post?";
const FAILURE_MESSAGE = "Não foi possível excluir o post.";

function getErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (err.response?.status === 403) {
      return "Você não tem permissão para excluir este post.";
    }

    return err.response?.data?.message ?? FAILURE_MESSAGE;
  }

  return FAILURE_MESSAGE;
}

/** Confirma e exclui um post via DELETE /posts/:id, removendo-o da lista local */
export function useDeletePost(onDeleted?: (id: string) => void) {
  const dispatch = useAppDispatch();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const remove = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await deletePost(id);
        dispatch(removePost(id));
        onDeleted?.(id);
      } catch (err) {
        Alert.alert("Erro", getErrorMessage(err));
      } finally {
        setDeletingId(null);
      }
    },
    [dispatch, onDeleted],
  );

  const confirmDelete = useCallback(
    (id: string) => {
      Alert.alert("Excluir post", CONFIRM_MESSAGE, [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => void remove(id) },
      ]);
    },
    [remove],
  );

  return { deletingId, confirmDelete };
}
