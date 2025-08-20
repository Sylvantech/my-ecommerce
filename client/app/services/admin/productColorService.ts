import { apiClient } from "../apiClient";

export const productColor = {
  getColors: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/productColor");
      if (!res.ok) {
        return {
          success: false,
          error: "Erreur lors de la récupération des catégories",
        };
      }
      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      console.error(err);
    }
  },
  createColor: async (name: string, hex_code: string) => {
    try {
      const res = await apiClient("http://localhost:3000/api/productColor", {
        method: "POST",
        body: JSON.stringify({ name, hex_code }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Token invalide ou expiré");
        } else if (res.status === 403) {
          throw new Error("Droits administrateur requis");
        }
      }

      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err };
    }
  },
};
