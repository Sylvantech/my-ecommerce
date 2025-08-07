import { CookieHelper } from "./cookieHelper";

export class AuthHelper {
  static isLoggedIn(): boolean {
    const accessToken = CookieHelper.getToken("AccesToken");
    return !!accessToken;
  }

  static isAnonymous(): boolean {
    return !this.isLoggedIn();
  }
}
