import ProductsCard from "../components/ProductsCard";
import type { Product } from "../types/product";
import { useEffect, useState } from "react";

type RawProduct = {
  id: number;
  title: string;
  description: string;
  price: { $numberDecimal: string };
  category_id: { name: string } | null;
  assets: { url: string }[];
};

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/product");
        const data = await res.json();

        const formatted: Product[] = data.product.map((item: RawProduct) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: parseFloat(item.price.$numberDecimal),
          image: item.assets?.[0]?.url || "",
          category: item.category_id?.name || "Sans catégorie",
        }));

        setProducts(formatted);
      } catch (err) {
        setError("Erreur lors du chargement des produits.");
        console.error(err);
      } finally {
        setLoading(false);
      }
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
