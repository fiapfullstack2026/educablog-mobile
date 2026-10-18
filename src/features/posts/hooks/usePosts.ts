import { useCallback, useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import { getPosts, searchPosts } from "../services/postsService";
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

/**
 * Lista os posts; com `search` preenchido usa a busca do back-end.
 */
export function usePosts(search = "") {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Descarta respostas de requisições antigas que chegam depois da mais recente
  const requestId = useRef(0);
  const term = search.trim();

  /** Retorna `true` se esta ainda era a requisição mais recente */
  const load = useCallback(async () => {
    const id = ++requestId.current;
    setError(null);
    try {
      const result = term ? await searchPosts(term) : await getPosts();
      if (id === requestId.current) setPosts(result);
    } catch (err) {
      if (id === requestId.current) {
        setPosts([]);
        setError(getErrorMessage(err));
      }
    }
    return id === requestId.current;
  }, [term]);

  useEffect(() => {
    setSearching(true);
    load().then((isLatest) => {
      if (!isLatest) return;
      setLoading(false);
      setSearching(false);
    });
  }, [load]);

  // Pull-to-refresh: mantém a lista atual visível enquanto recarrega
  const refresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return { posts, loading, searching, refreshing, error, refresh };
}
