import { useState, useEffect } from "react";
import { useParams } from "react-router";
import StarRating from "~/components/StarRating";
import { productService } from "~/services/productService";
import { productSizeService } from "~/services/productSizeService"; 
import { cartService } from "~/services/cartService";
import type { Product, ProductVariant, ProductColor } from "~/types/product";
import type { ProductSize } from "~/types/productSize";

export default function Product() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [allSizes, setAllSizes] = useState<ProductSize[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [addToCartMessage, setAddToCartMessage] = useState<string>("");

  const availableSizes = allSizes.filter(size => 
    variants.some(variant => variant.size_id._id === String(size.id))
  );

  const filteredVariantsBySize = selectedSize 
    ? variants.filter(v => v.size_id._id === selectedSize)
    : [];

  useEffect(() => {
    async function fetchProductData() {
      if (!slug) return;
      
      try {
        const productRes = await productService.getOne(Number(slug));
        if (productRes.success && productRes.data) {
          setProduct(productRes.data);
          setCurrentImage(productRes.data.src);
        }

        const sizesRes = await productSizeService.getAll();
        if (sizesRes.success && sizesRes.data) {
          setAllSizes(sizesRes.data);
        }

        const variantsRes = await productService.getVariants(Number(slug));
        if (variantsRes.success && variantsRes.data) {

          setVariants(variantsRes.data);
          
          if (variantsRes.data.length > 0) {
            const firstSize = variantsRes.data[0].size_id._id;
            setSelectedSize(firstSize);
            
            const firstVariantForSize = variantsRes.data.find(v => v.size_id._id === firstSize);
            if (firstVariantForSize) {
              setSelectedVariant(firstVariantForSize);
              setCurrentImage(firstVariantForSize.src);
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      }
    }

    fetchProductData();
  }, [slug]);

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
    
    const firstVariantForSize = variants.find(v => v.size_id._id === sizeId);
    if (firstVariantForSize) {
      setSelectedVariant(firstVariantForSize);
      setCurrentImage(firstVariantForSize.src);
    } else {
      setSelectedVariant(null);
      setCurrentImage(product?.src || "");
    }
    
    setQuantity(1);
  };

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setCurrentImage(variant.src);
    setQuantity(1); 
  };

  const getSizeStock = (sizeId: string): number => {
    return variants
      .filter(v => v.size_id._id === sizeId)
      .reduce((total, v) => total + v.stock, 0);
  };

  const getVariantStock = (): number => {
    return selectedVariant?.stock || 0;
  };

  const isVariantAvailable = (): boolean => {
    return !!(selectedVariant?.available && (selectedVariant?.stock || 0) > 0);
  };

  const handleQuantityChange = (change: number) => {
    const maxStock = getVariantStock();
    const newQuantity = Math.max(1, Math.min(quantity + change, maxStock));
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !product) return;

    setIsAddingToCart(true);
    setAddToCartMessage("");

    try {
      const result = await cartService.addToCart(
        String(selectedVariant.id), 
        quantity
      );

      if (result.success) {
        setAddToCartMessage(
          `✅ ${quantity} article${quantity > 1 ? "s" : ""} ajouté${quantity > 1 ? "s" : ""} au panier !`
        );
        setQuantity(1);
      } else {
        setAddToCartMessage(
          `❌ Erreur: ${result.error || "Impossible d'ajouter au panier"}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      setAddToCartMessage("❌ Une erreur s'est produite");
    } finally {
      setIsAddingToCart(false);
      setTimeout(() => {
        setAddToCartMessage("");
      }, 3000);
    }
  };

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="text-lg font-medium text-gray-600">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen from-pink-100 via-purple-50 to-blue-100 flex flex-col">
      <div className="mt-15 flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-12 px-6 py-12">
        <div className="flex flex-col items-center gap-8 w-full lg:w-1/2 relative">
          <div className="relative w-full">
            <img
              src={currentImage}
              alt={product.title}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg aspect-square object-cover border-4 border-white transition-all duration-500"
            />
            {selectedVariant && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: selectedVariant.color_id.hex_code }}
                  />
                  <span className="text-sm font-bold text-gray-800">
                    {selectedVariant.color_id.name} - {selectedVariant.size_id.size}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-purple-800 bg-clip-text text-transparent leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-2">
              <StarRating productId={product.id} />
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {product.price}€
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📏</span>
              Tailles disponibles
            </h3>
            <div className="flex flex-wrap gap-3">
              {allSizes.map((size) => {
                const stock = getSizeStock(size._id);
                const isAvailable = stock > 0;
                const isSelected = selectedSize === size._id;
                
                return (
                  <button
                    key={size._id}
                    onClick={() => isAvailable && handleSizeSelect(size._id)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : isAvailable
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-gray-200 hover:border-purple-300"
                        : "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {size.eu_size}
                    {!isAvailable && (
                      <span className="block text-xs">Épuisé</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedSize && filteredVariantsBySize.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🎨</span>
                Variants disponibles pour la taille {allSizes.find(s => s._id === selectedSize)?.eu_size}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredVariantsBySize.map((variant) => {
                  const isAvailable = variant.available && variant.stock > 0;
                  const isSelected = selectedVariant?.id === variant.id;
                  
                  return (
                    <div
                      key={variant.id}
                      onClick={() => isAvailable && handleVariantSelect(variant)}
                      className={`group cursor-pointer transition-all duration-300 ${
                        !isAvailable ? "cursor-not-allowed opacity-50" : "hover:scale-105"
                      }`}
                    >
                      <div
                        className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                          isSelected
                            ? "ring-4 ring-purple-500 shadow-xl"
                            : isAvailable
                            ? "ring-2 ring-gray-200 hover:ring-purple-300 hover:shadow-xl"
                            : "ring-2 ring-gray-200"
                        }`}
                        style={{
                          borderTop: `4px solid ${variant.color_id.hex_code}`,
                        }}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={variant.src}
                            alt={`${product.title} - ${variant.color_id.name}`}
                            className="w-full h-full object-cover"
                          />
                          
                          <div className="absolute top-2 right-2">
                            {isAvailable ? (
                              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                {variant.stock}
                              </div>
                            ) : (
                              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                Épuisé
                              </div>
                            )}
                          </div>

                          {isSelected && (
                            <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                              <div className="bg-white rounded-full p-2 shadow-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-purple-600"
                                >
                                  <polyline points="20,6 9,17 4,12"></polyline>
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-3 bg-white">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: variant.color_id.hex_code }}
                            />
                            <span className="text-sm font-semibold text-gray-800 truncate">
                              {variant.color_id.name}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            Stock: {variant.stock}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedVariant && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🛒</span>
                Quantité
              </h3>
              {isVariantAvailable() ? (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 w-12 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <div className="bg-gray-50 px-6 py-3 rounded-xl border-2 border-gray-200 min-w-[60px] text-center">
                      <span className="text-xl font-bold text-gray-800">
                        {quantity}
                      </span>
                    </div>
                    <button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 w-12 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= getVariantStock()}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Stock disponible</p>
                    <p className="text-green-600">{getVariantStock()} articles</p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 font-medium">
                    Cette variante n'est plus en stock
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            {addToCartMessage && (
              <div
                className={`p-4 rounded-2xl text-center font-medium ${
                  addToCartMessage.includes("✅")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {addToCartMessage}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || !selectedVariant || !isVariantAvailable()}
              className={`group relative overflow-hidden ${
                isAddingToCart || !selectedVariant || !isVariantAvailable()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700"
              } text-white px-8 py-4 rounded-2xl w-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 text-lg font-bold`}
            >
              <div className="relative flex justify-center items-center gap-3">
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Ajout en cours...
                  </>
                ) : (
                  <>
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
                      className="w-6 h-6"
                    >
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    {selectedVariant && isVariantAvailable() 
                      ? `Ajouter au Panier (${quantity})` 
                      : "Sélectionnez une variante"}
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}