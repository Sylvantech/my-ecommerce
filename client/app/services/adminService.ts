export const adminService = {
  async authenticated(token: string) {
    try {
      const res = await fetch("http://localhost:3000/api/admin/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Token invalide ou expiré");
        } else if (res.status === 403) {
          throw new Error("Droits administrateur requis");
        } else {
          throw new Error("Erreur d'authentification");
        }
      }

      return await res.json();
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erreur inconnue lors de l'authentification"
      );
    }
  },

  getCategories: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/category/");
      if (!res.ok) {
        return {
          success: false,
          error: "Erreur lors de la récupération des catégories",
        };
      }
      const data = await res.json();
      return { success: true, data: data.categories };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },
};
