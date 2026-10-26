import { api } from "@/lib/axios";
import type { ApiListResponse, ApiResponse } from "@/types/api.types";
import type { CreatePostRequest, Post } from "../types/post.types";

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

/** POST /posts — requer professor; responde 201 sem corpo */
export async function createPost(payload: CreatePostRequest): Promise<void> {
  await api.post("/posts", payload);
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

/**
 * Exclui um post (apenas professores).
 * DELETE /posts/:id
 */
export async function deletePost(id: string): Promise<void> {
  await api.delete(`/posts/${encodeURIComponent(id)}`);
}
