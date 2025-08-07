import ProductsCard from "./ProductsCard";
import useProductListHook from "../../hooks/useProductListHook";

const ProductsList = () => {
  const { products, loading, error } = useProductListHook();

  if (loading) return <div className="text-center p-6">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  console.log(products);
  console.log("toto");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center">
      {products.map(product => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
