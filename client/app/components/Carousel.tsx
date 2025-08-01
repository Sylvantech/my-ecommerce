import { useState, useEffect } from "react";
import useProductListHook from "~/hooks/useProductListHook";
import ProductsCard from "./Products/ProductsCard";

export default function Carousel() {
  const { products, loading, error } = useProductListHook();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex + visibleCount >= products.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(products.length - visibleCount);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleproducts = products
    .slice(currentIndex, currentIndex + visibleCount)
    .map(product => <ProductsCard key={product.id} product={product} />);

  if (loading)
    return <div className="text-center p-6 text-black">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="flex gap-4 items-center">
        <button
          className="mr-16 transition-colors bg-gray-200 hover:bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left w-5 h-5"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
        {visibleproducts}
        <button
          className="mr-16 transition-colors bg-gray-200 hover:bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right w-5 h-5"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
