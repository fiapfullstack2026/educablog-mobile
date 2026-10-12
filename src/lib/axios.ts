import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// A URL base vem de variável de ambiente Expo (EAS Build) ou do valor padrão de dev
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://educablog.onrender.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// --- Interceptor de request: anexa token JWT ---
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Interceptor de response: trata 401 fora das rotas de auth ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestUrl: string = error.config?.url ?? '';
    const isAuthRequest = /\/user\/(signin|register)/.test(requestUrl);

    if (error.response?.status === 401 && !isAuthRequest) {
      // Limpa credenciais — o RootNavigator vai redirecionar para Login
      // ao detectar token null no Redux store via PersistGate
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
    }

    return Promise.reject(error);
  },
);
