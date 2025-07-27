import { useState } from 'react';
import { authService } from '../services/authService';
import { CookieHelper } from '../utils/cookieHelper';
import type { LoginCredentials } from '../types/auth';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const login = async (infos: LoginCredentials) => {
    setLoading(true);
    setErr(null);

    try {
      const result = await authService.login(infos);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Erreur inconnue");
      }
      CookieHelper.setToken(result.data.token);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr('Erreur');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    CookieHelper.removeToken();
    setErr(null);
  };

  return {
    login,
    logout,
    clearError: () => setErr(null),
    loading,
    err,
  };
}