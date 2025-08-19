import type { ProductColor } from "../types/productColor";

export const productColorService = {
  async getAll(): Promise<{
    success: boolean;
    data?: ProductColor[];
    error?: string;
  }> {
    try {
      const res = await fetch("http://localhost:3000/api/productColor");

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erreur HTTP ${res.status}`);
      }

      const data = await res.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formatted: ProductColor[] = data.productColors.map((item: any) => ({
        _id: item._id,
        id: item.id,
        name: item.name,
        hex_code: item.hex_code,
        created_at: item.created_at ? new Date(item.created_at) : undefined,
        updated_at: item.updated_at ? new Date(item.updated_at) : undefined,
      }));

      return { success: true, data: formatted };
    } catch (err) {
      let errorMessage = "Une erreur est survenue";

      if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage =
          "NetworkError when attempting to fetch resource - Serveur indisponible";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = String(err);
      }

      console.error(
        "Erreur lors du fetch des couleurs de produits :",
        errorMessage
      );
      return { success: false, error: errorMessage };
    }
  },
};
