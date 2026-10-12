import { useState } from 'react';

/**
 * Hook stub — Semana 2 implementará a integração real com /user/signin,
 * SecureStore e dispatch do Redux.
 */
export function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    if (!username || !password) {
      setError('Preencha usuário e senha.');
      return;
    }
    setLoading(true);
    // TODO (Semana 2): chamar authService.signIn({ username, password })
    setLoading(false);
  };

  return {
    form: { username, setUsername, password, setPassword },
    error,
    loading,
    submit,
  };
}
