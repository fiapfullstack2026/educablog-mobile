export interface Post {
  _id: string;
  title: string;
  content: string;
  teacher: string;
  discipline: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  author?: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  teacher: string;
  discipline: string;
}

export type UpdatePostRequest = Partial<CreatePostRequest>;
