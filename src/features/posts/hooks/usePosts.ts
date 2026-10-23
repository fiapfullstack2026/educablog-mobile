import { useCallback, useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { ApiError } from "@/types/api.types";

import { setPosts, setListLoading, setListError } from "../postSlice";
import { getPosts, searchPosts } from "../services/postsService";

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

export function usePosts(search = "") {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.posts.list);
  const loading = useAppSelector((state) => state.posts.listLoading);
  const error = useAppSelector((state) => state.posts.listError);

  const [searching, setSearching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const requestId = useRef(0);
  const term = search.trim();

  const load = useCallback(async () => {
    const id = ++requestId.current;

    dispatch(setListLoading(true));
    dispatch(setListError(null));

    try {
      const result = term ? await searchPosts(term) : await getPosts();

      if (id === requestId.current) {
        dispatch(setPosts(result));
      }
    } catch (err) {
      if (id === requestId.current) {
        dispatch(setPosts([]));
        dispatch(setListError(getErrorMessage(err)));
      }
    } finally {
      if (id === requestId.current) {
        dispatch(setListLoading(false));
      }
    }

    return id === requestId.current;
  }, [dispatch, term]);

  useEffect(() => {
    let active = true;

    setSearching(true);

    void load().then((isLatest) => {
      if (active && isLatest) {
        setSearching(false);
      }
    });

    return () => {
      active = false;
    };
  }, [load]);

  const refresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  return {
    posts,
    loading,
    searching,
    refreshing,
    error,
    refresh,
  };
}
