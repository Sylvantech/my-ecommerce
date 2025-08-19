import type { User } from "../../types/userlist";
import { CookieHelper } from "../../utils/cookieHelper";
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

  deleteCategory: async (idCategory: number) => {
    const token = CookieHelper.getToken("AccesToken");
    if (!token) {
      return { success: false, error: "Token manquant" };
    }

    try {
      const res = await fetch("http://localhost:3000/api/category/", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idCategory }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Token invalide ou expiré");
        } else if (res.status === 403) {
          throw new Error("Droits administrateur requis");
        }
      }
      return {
        success: true,
        data: `La catégorie ${idCategory} a bien été supprimé`,
      };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },

  getUsers: async (): Promise<{
    success: boolean;
    data?: User[];
    error?: string;
  }> => {
    try {
      const res = await fetch("http://localhost:3000/api/user/");
      if (!res.ok) {
        const message = "Erreur lors de la récupération des utilisateurs";
        return { success: false, error: message };
      }
      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },
  modifyCategory: async (name: string, description: string, id: number) => {
    const token = CookieHelper.getToken("AccesToken");
    if (!token) {
      return { success: false, error: "Token manquant" };
    }
    try {
      const res = await fetch("http://localhost:3000/api/category/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, id }),
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
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },

  createCategory: async (name: string, description: string) => {
    const token = CookieHelper.getToken("AccesToken");
    if (!token) {
      return { success: false, error: "Token manquant" };
    }
    try {
      const res = await fetch("http://localhost:3000/api/category/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
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
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },
  getProductVariants: async (limit?: number) => {
    try {
      const body = limit && limit > 0 ? { limit } : {};
      const res = await fetch("http://localhost:3000/api/productVariant/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        return {
          success: false,
          error: "Erreur lors de la récupération des variants",
        };
      }

      const data = await res.json();
      return { success: true, data: data.variants };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },

  deleteProductVariant: async (idProductVariant: number) => {
    const token = CookieHelper.getToken("AccesToken");
    if (!token) {
      return { success: false, error: "Token manquant" };
    }

    try {
      const res = await fetch("http://localhost:3000/api/productVariant/", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idProductVariant }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Token invalide ou expiré");
        } else if (res.status === 403) {
          throw new Error("Droits administrateur requis");
        }
      }
      return {
        success: true,
        data: `Le variant de produit ${idProductVariant} a bien été supprimé`,
      };
    } catch (err) {
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },

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

  createProductVariant: async (
    product_id: string,
    size_id: string,
    color_id: string,
    src: string,
    stock: number,
    available: boolean
  ) => {
    const token = CookieHelper.getToken("AccesToken");
    if (!token) {
      return { success: false, error: "Token manquant" };
    }
    try {
      const res = await fetch("http://localhost:3000/api/productVariant/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          size_id,
          color_id,
          src,
          stock,
          available,
        }),
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
      console.error(`erreur: ${err}`);
      return { success: false, error: "Erreur réseau ou serveur" };
    }
  },
};
