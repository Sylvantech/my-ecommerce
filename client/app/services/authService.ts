interface RegisterData {
  username: string;
  email: string;
  password: string;
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
        throw new Error(`Erreur HTTP ${res.status}`);
      }

      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`erreur : ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  },
};
