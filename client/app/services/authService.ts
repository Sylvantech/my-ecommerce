import { CookieHelper } from "~/utils/cookieHelper";
import type { RegisterData, LoginData, LoginResponse } from "~/types/auth";

export const authService = {
  async register(userData: RegisterData) {
    try {
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const serverErrorMessage =
          errorData.error || `Erreur HTTP ${res.status}`;
        throw new Error(serverErrorMessage);
      }

      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`erreur : ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  },

  async login(
    userData: LoginData
  ): Promise<{ success: boolean; data?: LoginResponse; error?: string }> {
    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Erreur HTTP ${res.status}`);
      }

      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`erreur : ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  },
  async refreshToken(token: string) {
    const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token }),
    });

    if (!res.ok) throw new Error("Refresh failed");

    const data = await res.json();
    CookieHelper.setToken(data.token, "AccesToken");
    return data.token;
  },
};
