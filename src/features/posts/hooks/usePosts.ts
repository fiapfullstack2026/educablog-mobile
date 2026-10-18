import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { getPosts } from "../services/postsService";
import type { Post } from "../types/post.types";
import type { ApiError } from "@/types/api.types";

function getErrorMessage(err: unknown): string {
  if (isAxiosError<ApiError>(err)) {
    if (err.code === "ECONNABORTED") {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (!err.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }
    return err.response.data?.message ?? "Erro ao carregar os posts.";
  }
  return "Erro inesperado. Tente novamente.";
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setPosts(await getPosts());
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  // Pull-to-refresh: mantém a lista atual visível enquanto recarrega
  const refresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return { posts, loading, refreshing, error, refresh };
}
