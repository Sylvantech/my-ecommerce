import { useEffect, useState } from "react";
import ProductsCard from "../components/ProductsCard";
import type { Product } from "../types/product";
import { productService } from "../services/productService";

const ProductsList = () => {
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

  if (loading) return <div className="text-center p-6">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center">
      {products.map(product => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
