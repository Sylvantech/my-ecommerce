import { apiClient } from "../apiClient";

export const reviewServiceAdmin = {
  getPendingReview: async () => {
    try {
      const res = await apiClient("http://localhost:3000/api/review/pending");
      if (!res.ok) {
        return {
          success: false,
          error:
            "Erreur lors de la récupération des review en attente de validation",
        };
      }
      const data = await res.json();
      return { success: true, data: data.review };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },
  verifyReview: async (id: number) => {
    try {
      const res = await apiClient("http://localhost:3000/api/review", {
        method: "PATCH",
        body: JSON.stringify({ id, verified: true }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Token invalide ou expiré");
        } else if (res.status === 403) {
          throw new Error("Droits administrateur requis");
        }
        const errMsg = await res.text();
        throw new Error(
          errMsg || "Erreur lors de la vérification de la review"
        );
      }
      return { success: true };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },
  deleteReview: async (id: number) => {
    try {
      const res = await apiClient("http://localhost:3000/api/review", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Token invalide ou expiré");
        } else if (res.status === 403) {
          throw new Error("Droits administrateur requis");
        }
        const errMsg = await res.text();
        throw new Error(errMsg || "Erreur lors de la suppression de la review");
      }
      return { success: true };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },
};
