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

  const renderLoadingPlaceholder = () => (
    <div className="flex flex-col items-center mt-32 mb-30">
      <div className="flex gap-4 items-center">
        <div className="mr-16 bg-gray-200 animate-pulse rounded-full h-10 w-10"></div>
        {Array.from({ length: visibleCount }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 w-64 h-80 animate-pulse">
            <div className="bg-gray-200 h-48 w-full rounded mb-4"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded mb-4"></div>
            <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
          </div>
        ))}
        <div className="mr-16 bg-gray-200 animate-pulse rounded-full h-10 w-10"></div>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center mt-32 mb-30 p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <svg 
            className="w-12 h-12 text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Erreur de chargement
        </h3>
        <p className="text-red-600 text-sm mb-4">
          Impossible de charger les produits. Veuillez réessayer.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );

  if (loading) return renderLoadingPlaceholder();
  if (error) return renderError();

  return (
    <div className="flex flex-col items-center mt-32 mb-30">
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
