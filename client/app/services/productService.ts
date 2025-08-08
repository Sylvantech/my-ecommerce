import type { Product } from "../types/product";

export const productService = {
  async getAll(): Promise<{
    success: boolean;
    data?: Product[];
    error?: string;
  }> {
    try {
      const res = await fetch("http://localhost:3000/api/product");

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erreur HTTP ${res.status}`);
      }

      const data = await res.json();

      const formatted: Product[] = data.products.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category_id
          ? {
              _id: String(item.category_id._id),
              id: item.category_id.id,
              name: item.category_id.name,
              description: item.category_id.description,
            }
          : undefined,

        price: item.price,
        composition: item.composition,
        weight_in_gr: item.weight_in_gr,
        is_promo: item.is_promo,
        is_new: item.is_new,
        src: item.src,
        created_at: item.created_at ? new Date(item.created_at) : undefined,
        updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
      }));

      return { success: true, data: formatted };
    } catch (err) {
      let errorMessage = "Une erreur est survenue";
      
      if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage = "NetworkError when attempting to fetch resource - Serveur indisponible";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = String(err);
      }
      
      console.error("Erreur lors du fetch des produits :", errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  async getOne(id: number): Promise<{
    success: boolean;
    data?: Product;
    error?: string;
  }> {
    try {
      const res = await fetch(`http://localhost:3000/api/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erreur HTTP ${res.status}`);
      }

      const data = await res.json();
      const item = data.product;

      const formatted: Product = {
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category_id
          ? {
              _id: String(item.category_id._id),
              id: item.category_id.id,
              name: item.category_id.name,
              description: item.category_id.description,
            }
          : undefined,
        price: item.price,
        composition: item.composition,
        weight_in_gr: item.weight_in_gr,
        is_promo: item.is_promo,
        is_new: item.is_new,
        src: item.src,
        created_at: item.created_at ? new Date(item.created_at) : undefined,
        updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
      };

      return { success: true, data: formatted };
    } catch (err) {
      let errorMessage = "Une erreur est survenue";
      
      if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage = "NetworkError when attempting to fetch resource - Serveur indisponible";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = String(err);
      }
      
      console.error("Erreur lors du fetch du produit :", errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  async getVariants(productId: number): Promise<{
    success: boolean;
    data?: any[];
    error?: string;
  }> {
    try {
      const res = await fetch(
        `http://localhost:3000/api/productVariant/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erreur HTTP ${res.status}`);
      }

      const data = await res.json();

      return { success: true, data: data.variants };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Erreur lors du fetch des variantes :", errorMessage);
      return { success: false, error: errorMessage };
    }
  },
};
