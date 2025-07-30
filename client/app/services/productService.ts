import type { Product, RawProduct } from "../types/product";

export const productService = {
    async getAll(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
      try {
        const res = await fetch("http://localhost:3000/api/product");
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `Erreur HTTP ${res.status}`);
        }
  
        const data = await res.json();
  
        const formatted: Product[] = data.products.map((item: RawProduct) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: parseFloat(item.price.$numberDecimal),
          image: item.assets?.[0]?.url || "",
          category: item.category_id?.name || "Sans catégorie",
        }));
  
        return { success: true, data: formatted };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("Erreur lors du fetch des produits :", errorMessage);
        return { success: false, error: errorMessage };
      }
    },
  };