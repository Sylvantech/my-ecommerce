import type { ProductSize } from "../types/productSize";

export const productSizeService = {
  async getAll(): Promise<{
    success: boolean;
    data?: ProductSize[];
    error?: string;
  }> {
    try {
      const res = await fetch("http://localhost:3000/api/productSize");

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erreur HTTP ${res.status}`);
      }

      const data = await res.json();

      const formatted: ProductSize[] = data.productSizes.map((item: any) => ({
        id: item.id,
        _id: item._id,
        eu_size: item.eu_size,
        label: item.label,
        created_at: item.created_at ? new Date(item.created_at) : undefined,
        updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
      }));

      return { success: true, data: formatted };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Erreur lors du fetch des tailles :", errorMessage);
      return { success: false, error: errorMessage };
    }
  },
};
