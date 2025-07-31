import { CookieHelper } from "~/utils/cookieHelper";
import { authService } from "./authService";

export async function apiClient(input: string, options: RequestInit = {}) {
  const accesToken = CookieHelper.getToken("AccesToken");
  const refreshToken = CookieHelper.getToken("RefreshToken");

  const headers = {
    ...options.headers,
    Authorization: accesToken ? `Bearer ${accesToken}` : "",
    "Content-Type": "application/json",
  };

  let response = await fetch(input, { ...options, headers });

  if (response.status === 401) {
    try {
      if (!refreshToken) {
        throw new Error("Session expirée");
      }
      const newToken = await authService.refreshToken(refreshToken);
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
        "Content-Type": "application/json",
      };
      response = await fetch(input, { ...options, headers: retryHeaders });
    } catch {
      window.location.href = "/login";
      throw new Error("Session expirée");
    }
  }
  return response;
}
