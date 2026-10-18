import { api } from "@/lib/axios";
import type { ApiListResponse } from "@/types/api.types";
import type { Post } from "../types/post.types";

// Usa `new RegExp(q)` para que buscas como "C++" sejam literais e não gerem 500
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getPosts(): Promise<Post[]> {
  const { data } = await api.get<ApiListResponse<Post>>("/posts");

  return data.data ?? [];
}

// Minúsculas e sem acento, para comparar "Física" com "física"
function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * Busca por título. O GET /posts/search?q= do back-end também casa com o
 * conteúdo (ex.: "física" traz "Filosofia oriental" por causa de "metafísica"),
 * então filtramos o resultado mantendo só os posts cujo título contém o termo.
 */
export async function searchPosts(query: string): Promise<Post[]> {
  const { data } = await api.get<ApiListResponse<Post>>("/posts/search", {
    params: { q: escapeRegExp(query) },
  });

  const term = normalizeText(query);
  return (data.data ?? []).filter((post) =>
    normalizeText(post.title ?? "").includes(term),
  );
}
