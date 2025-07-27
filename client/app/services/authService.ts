interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

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

  async validateToken(token: string): Promise<boolean> {
    try {
      const res = await fetch("http://localhost:3000/api/user/validate", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      return res.ok;
    } catch {
      return false;
    }
  },

  async getCurrentUser(token: string) {
    try {
      const res = await fetch("http://localhost:3000/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Impossible de récupérer l'utilisateur");
      }

      return await res.json();
    } catch (error: unknown) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      throw new Error("Erreur réseau ou jeton invalide");
    }
  },
};