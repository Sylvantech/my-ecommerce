import { CookieHelper } from "./cookieHelper";

export class AuthHelper {
  static isLoggedIn(): boolean {
    const accessToken = CookieHelper.getToken("AccesToken");
    return !!accessToken;
  }

  static isAnonymous(): boolean {
    return !this.isLoggedIn();
  }

  static isAdmin(): boolean {
    const accessToken = CookieHelper.getToken("AccesToken");
    if (accessToken) {
      if (this.parseJwt(accessToken).role == "admin") {
        return true;
      }
    }
    return false;
  }

  static parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
}
