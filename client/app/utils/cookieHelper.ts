export class CookieHelper {

  static setToken(t: string, key: string) {
    document.cookie = `${key}=${t}; max-age=7200; path=/; secure; samesite=Strict`;
  }

  static getToken(key: string) {
    const parts = document.cookie.split(";");
    for (let i = 0; i < parts.length; i++) {
      const cookie = parts[i].trim();
      if (cookie.startsWith(key + "=")) {
        return cookie.substring(key.length + 1);
      }
    }
    return null;
  }

  static removeToken(key: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
