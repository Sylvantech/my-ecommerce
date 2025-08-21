import { apiClient } from "../apiClient";

export const productServiceAdmin = {
  createProduct: async (payload: {
    title: string;
    description?: string;
    price: number;
    category_id: string;
    composition?: string;
    weight_in_gr?: number;
    is_promo?: boolean;
    is_new?: boolean;
    src?: string;
  }) => {
    try {
      const res = await apiClient("http://localhost:3000/api/product/", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("Droits administrateur requis");
        }
        const err = await res.json().catch(() => ({} as unknown));
        throw new Error((err as { error?: string }).error || "Erreur lors de la création du produit");
      }

      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur réseau ou serveur",
      };
    }
  },

  deleteProduct: async (id: number) => {
    try {
      const res = await apiClient("http://localhost:3000/api/product/", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("Droits administrateur requis");
        }
        const err = await res.json().catch(() => ({} as unknown));
        throw new Error((err as { error?: string }).error || "Erreur lors de la suppression du produit");
      }
      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Erreur réseau ou serveur",
      };
    }
  },
};
