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

      console.log(res);

      const data = await res.json();

      const formatted: Product[] = data.products.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category_id: item.category_id
          ? {
              _id: item.category_id._id,
              name: item.category_id.name,
            }
          : "Sans catégorie",
        price: item.price?.$numberDecimal ?? item.price,
        color: item.color,
        composition: item.composition,
        size: item.size,
        in_stock: item.in_stock,
        stock: item.stock,
        weight_in_gr: item.weight_in_gr,
        is_promo: item.is_promo,
        is_new: item.is_new,
        assets:
          item.assets?.map((asset: any) => ({
            _id: asset._id,
            url: asset.url,
            alt: asset.alt,
          })) ?? [],
        sizes:
          item.sizes?.map((size: any) => ({
            _id: size._id,
            name: size.name,
          })) ?? [],
        created_at: item.created_at ? new Date(item.created_at) : undefined,
        updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
      }));

      return { success: true, data: formatted };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
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
        category_id: item.category_id
          ? {
              _id: item.category_id._id,
              name: item.category_id.name,
            }
          : "Sans catégorie",
        price: item.price?.$numberDecimal ?? item.price,
        color: item.color,
        composition: item.composition,
        size: item.size,
        in_stock: item.in_stock,
        stock: item.stock,
        weight_in_gr: item.weight_in_gr,
        is_promo: item.is_promo,
        is_new: item.is_new,
        assets:
          item.assets?.map((asset: any) => ({
            _id: asset._id,
            url: asset.url,
            alt: asset.alt,
          })) ?? [],
        sizes:
          item.sizes?.map((size: any) => ({
            _id: size._id,
            name: size.name,
          })) ?? [],
        created_at: item.created_at ? new Date(item.created_at) : undefined,
        updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
      };

      return { success: true, data: formatted };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Erreur lors du fetch du produit :", errorMessage);
      return { success: false, error: errorMessage };
    }
  },
};
