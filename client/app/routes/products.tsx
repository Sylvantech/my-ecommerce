import React from "react";
import ProductsCard from "../components/ProductsCard";
import type { Product } from "../types/product";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "T-shirt coton bio",
    image: "https://via.placeholder.com/300x300.png?text=T-shirt",
    price: 29.99,
    category: "Vêtements",
    description: "Un t-shirt doux en coton biologique, parfait pour l’été.",
  },
  {
    id: 2,
    title: "Casque Bluetooth",
    image: "https://via.placeholder.com/300x300.png?text=Casque",
    price: 89.99,
    category: "Électronique",
    description: "Un son immersif et une autonomie de 20h sans interruption.",
  },
  {
    id: 3,
    title: "Chaussures de sport",
    image: "https://via.placeholder.com/300x300.png?text=Chaussures",
    price: 59.99,
    category: "Chaussures",
    description: "Confortables, légères et parfaites pour la course.",
  },
  {
    id: 4,
    title: "Montre connectée",
    image: "https://via.placeholder.com/300x300.png?text=Montre",
    price: 149.99,
    category: "Accessoires",
    description: "Suivi d’activité, notifications et design élégant.",
  },
];

const ProductsList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center">
      {mockProducts.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
