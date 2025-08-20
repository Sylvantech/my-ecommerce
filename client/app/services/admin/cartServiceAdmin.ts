import { apiClient } from "../apiClient";

export const cartServiceAdmin = {
  getCarts: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/cart/");
      if (!res.ok) {
        return {
          success: false,
          error: "Erreur lors de la récupération des paniers",
        };
      }
      const data = await res.json();
      return { success: true, data: data.carts };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },

  getCartProductsByCartId: async (cartId: string) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/productCart/getByCartId",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart_id: cartId }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return {
          success: false,
          error:
            err.error ||
            "Erreur lors de la récupération des produits du panier",
        };
      }
      const data = await res.json();
      return { success: true, data: data.cart_products };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },

  deleteCart: async (id: string) => {
    try {
      const res = await apiClient("http://localhost:3000/api/cart/", {
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
        throw new Error(errMsg || "Erreur lors de la suppression du panier");
      }
      return { success: true };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },
};
