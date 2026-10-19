import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "@/store/hooks";
import { signOut as signOutAction } from "@/store/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();

  const signOut = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
    } finally {
      dispatch(signOutAction());
    }
  }, [dispatch]);

  return { signOut };
}
