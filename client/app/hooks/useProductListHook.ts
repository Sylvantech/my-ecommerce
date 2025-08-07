import { useEffect, useState } from "react";
import type { Product } from "~/types/product";
import { productService } from "~/services/productService";

const useProductListHook = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await productService.getAll();

      if (result.success && result.data) {
        setProducts(result.data);
      } else {
        setError(result.error || "Une erreur est survenue");
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProductListHook;
