export class CookieHelper {
  static key = 'auth_token';

  static setToken(t: string) {
    document.cookie = `${this.key}=${t}; max-age=7200; path=/; secure; samesite=Strict`;
  }

  static getToken() {
    const parts = document.cookie.split(';');
    for (let i = 0; i < parts.length; i++) {
      const cookie = parts[i].trim();
      if (cookie.startsWith(this.key + '=')) {
        return cookie.substring(this.key.length + 1);
      }
    }
    return null;
  }

  static removeToken() {
    document.cookie = `${this.key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
