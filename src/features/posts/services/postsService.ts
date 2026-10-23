import { api } from "@/lib/axios";
import type { ApiListResponse, ApiResponse } from "@/types/api.types";
import type { Post } from "../types/post.types";

// Usa `new RegExp(q)` para que buscas como "C++" sejam literais e não gerem 500
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getPosts(): Promise<Post[]> {
  const { data } = await api.get<ApiListResponse<Post>>("/posts");

  return data.data ?? [];
}

/** GET /posts/search?q= — busca no título e no conteúdo (case-insensitive) */
export async function searchPosts(query: string): Promise<Post[]> {
  const { data } = await api.get<ApiListResponse<Post>>("/posts/search", {
    params: { q: escapeRegExp(query) },
  });

  return data.data ?? [];
}

/**
 * Busca os detalhes completos de um post pelo ID.
 * GET /posts/:id
 */
export async function getPostById(id: string): Promise<Post> {
  const { data } = await api.get<ApiResponse<Post>>(
    `/posts/${encodeURIComponent(id)}`,
  );

  return data.data;
}
