import type { User } from '../types/auth.types';

/**
 * Decodifica o payload de um JWT sem verificar assinatura.
 * Usado apenas para extrair username e isTeacher do token retornado pela API.
 */
export function decodeToken(token: string): User | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // Base64url → Base64 padrão
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const decoded = atob(padded);
    const data = JSON.parse(decoded);

    return {
      username: data.username ?? data.sub ?? '',
      isTeacher: Boolean(data.isTeacher),
    };
  } catch {
    return null;
  }
}
