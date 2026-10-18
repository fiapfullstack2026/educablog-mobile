import { api } from "@/lib/axios";
import type { ApiListResponse } from "@/types/api.types";
import type { Post } from "../types/post.types";

export async function getPosts(): Promise<Post[]> {
  const { data } = await api.get<ApiListResponse<Post>>("/posts");

  return data.data ?? [];
}
