import * as SecureStore from "expo-secure-store";
import { api } from "@/lib/axios";
import { decodeToken } from "../utils/decodeToken";
import type { SignInRequest, SignInResponse, User } from "../types/auth.types";

export type RegisterRequest = {
  username: string;
  password: string;
  isTeacher: boolean;
};

export async function signIn(payload: SignInRequest): Promise<SignInResponse> {
  const { data } = await api.post<SignInResponse>("/user/signin", payload);

  return data;
}

export async function authenticate(
  payload: SignInRequest,
): Promise<{ token: string; user: User }> {
  const { token } = await signIn(payload);

  const user = decodeToken(token);

  if (!user) {
    throw new Error("INVALID_TOKEN");
  }

  await SecureStore.setItemAsync("token", token);
  await SecureStore.setItemAsync("user", JSON.stringify(user));

  return { token, user };
}

export async function register(payload: RegisterRequest): Promise<void> {
  await api.post("/user/register", payload);
}
