import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectToken, signOut } from "@/store/authSlice";
import { isTokenExpired } from "@/features/auth/utils/decodeToken";

import { PublicStack } from "./PublicStack";
import { AppStack } from "./AppStack";

export function RootNavigator() {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;

    const checkToken = async () => {
      if (!isTokenExpired(token)) return;

      try {
        await Promise.all([
          SecureStore.deleteItemAsync("token"),
          SecureStore.deleteItemAsync("user"),
        ]);
      } finally {
        dispatch(signOut());
      }
    };

    const safelyCheckToken = () => {
      void checkToken().catch(() => dispatch(signOut()));
    };

    safelyCheckToken();

    const timer = setInterval(safelyCheckToken, 30_000);

    return () => clearInterval(timer);
  }, [token, dispatch]);

  const validToken = token && !isTokenExpired(token);

  return (
    <NavigationContainer>
      {validToken ? <AppStack /> : <PublicStack />}
    </NavigationContainer>
  );
}
