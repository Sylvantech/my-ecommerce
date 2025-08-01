import type { Product, Asset, ProductSize } from "../types/product";

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

      const formatted: Product[] = data.products.map((item: Product) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category_id: item.category_id
          ? {
              _id: item.category_id._id,
              name: item.category_id.name,
            }
          : undefined,
        price: item.price,
        in_stock: item.in_stock,
        stock: item.stock,
        weight_in_gr: item.weight_in_gr,
        is_promo: item.is_promo,
        is_new: item.is_new,
        assets:
          item.assets
            ?.filter(
              (asset): asset is Asset =>
                typeof asset === "object" &&
                asset !== null &&
                "_id" in asset &&
                "url" in asset &&
                "alt" in asset
            )
            .map((asset: Asset) => ({
              _id: asset._id,
              url: asset.url,
              alt: asset.alt,
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
        category_id:
          item.category_id && item.category_id._id && item.category_id.name
            ? {
                _id: String(item.category_id._id),
                name: String(item.category_id.name),
              }
            : undefined,
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
          item.assets?.map((asset: Asset) => ({
            _id: asset._id,
            url: asset.url,
            alt: asset.alt,
          })) ?? [],
        sizes:
          item.sizes?.map((size: ProductSize) => ({
            _id: size._id,
            size: size.size,
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
