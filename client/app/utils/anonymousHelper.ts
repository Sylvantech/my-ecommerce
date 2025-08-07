import { v4 as uuidv4 } from "uuid";

export class AnonymousHelper {
  static generateAndStoreAnonymousId(): string {
    const anonymousId = uuidv4();
    localStorage.setItem("AnonymousUserId", anonymousId);
    return anonymousId;
  }

  static getAnonymousId(): string {
    let anonymousId = localStorage.getItem("AnonymousUserId");

    if (!anonymousId) {
      anonymousId = this.generateAndStoreAnonymousId();
    }

    return anonymousId;
  }

  static clearAnonymousId(): void {
    localStorage.removeItem("AnonymousUserId");
  }

  static hasAnonymousId(): boolean {
    return localStorage.getItem("AnonymousUserId") !== null;
  }

  static setAnonymousId(id: string): void {
    localStorage.setItem("AnonymousUserId", id);
  }
}
