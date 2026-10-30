import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/features/auth/types/auth.types';

// O token em si é persistido pelo redux-persist via AsyncStorage.
// SecureStore guarda a cópia segura (lida pelo interceptor Axios).
// Aqui apenas gerenciamos o estado em memória do Redux.

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      // A gravação no SecureStore é feita no serviço de auth antes de despachar esta action
    },
    signOut: (state) => {
      state.token = null;
      state.user = null;
      // A remoção do SecureStore é feita no hook useAuth
    },
    // Mantém a sessão em sincronia quando o próprio usuário edita seus dados
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const authReducer = authSlice.reducer;
export const { signIn, signOut, updateUser } = authSlice.actions;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsTeacher = (state: { auth: AuthState }) =>
  state.auth.user?.isTeacher ?? false;
