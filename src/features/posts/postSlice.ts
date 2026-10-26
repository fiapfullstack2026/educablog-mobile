import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "./types/post.types";

interface PostsState {
  list: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  listLoading: boolean;
  listError: string | null;
}

const initialState: PostsState = {
  list: [],
  selectedPost: null,
  loading: false,
  error: null,
  listLoading: false,
  listError: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.list = action.payload;
    },

    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },

    setPostsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setPostsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setListLoading(state, action: PayloadAction<boolean>) {
      state.listLoading = action.payload;
    },

    setListError(state, action: PayloadAction<string | null>) {
      state.listError = action.payload;
    },

    removePost(state, action: PayloadAction<string>) {
      state.list = state.list.filter((post) => post._id !== action.payload);
    },

    clearSelectedPost(state) {
      state.selectedPost = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setPosts,
  setSelectedPost,
  setPostsLoading,
  setPostsError,
  setListLoading,
  setListError,
  removePost,
  clearSelectedPost,
} = postSlice.actions;

export const postReducer = postSlice.reducer;
