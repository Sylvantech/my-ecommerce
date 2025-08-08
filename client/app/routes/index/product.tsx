import { useState, useEffect } from "react";
import { useParams } from "react-router";
import StarRating from "~/components/StarRating";
import { productService } from "~/services/productService";
import { productSizeService } from "~/services/productSizeService";
import { cartService } from "~/services/cartService";
import type { Product, ProductVariant } from "~/types/product";
import type { ProductSize } from "~/types/productSize";

export default function Product() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [allSizes, setAllSizes] = useState<ProductSize[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [currentImage, setCurrentImage] = useState<string>("");
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [addToCartMessage, setAddToCartMessage] = useState<string>("");

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

            const firstVariantForSize = variantsRes.data.find(
              v => v.size_id._id === firstSize
            );
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
        String(selectedVariant._id),
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
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <span className="text-xl font-semibold text-slate-700 animate-pulse">
            Chargement du produit...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="bg-white/70 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <a
              href="/"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Accueil
            </a>
            <span className="text-slate-400">›</span>
            <a
              href="/products"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Produits
            </a>
            <span className="text-slate-400">›</span>
            <span className="text-purple-600 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg transition-transform duration-700 group-hover:scale-105"
                />

                {product.is_new && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg animate-bounce">
                    ✨ NOUVEAU
                  </div>
                )}

                {product.is_promo && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg animate-pulse">
                    🔥 PROMO
                  </div>
                )}

                {selectedVariant && (
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{
                          backgroundColor: selectedVariant.color_id.hex_code,
                        }}
                      />
                      <div>
                        <p className="text-sm font-bold">
                          {selectedVariant.color_id.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {filteredVariantsBySize.length > 1 && (
              <div className="flex gap-3 justify-center">
                {filteredVariantsBySize.slice(0, 4).map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantSelect(variant)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedVariant?.id === variant.id
                        ? "ring-4 ring-purple-500 scale-110"
                        : "ring-2 ring-gray-200 hover:ring-purple-300 hover:scale-105"
                    }`}
                  >
                    <img
                      src={variant.src}
                      alt={variant.color_id.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent leading-tight mb-4">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4">
                  <StarRating productId={product.id} />
                  <span className="text-sm text-slate-500">•</span>
                  <span className="text-sm text-slate-600 font-medium">
                    {variants.reduce((total, v) => total + v.stock, 0)} en stock
                  </span>
                </div>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl shadow-xl">
                    <span className="text-3xl lg:text-4xl font-bold">
                      {product.price}€
                    </span>
                  </div>
                </div>
                {product.is_promo && (
                  <span className="text-lg text-slate-500 line-through">
                    {(product.price * 1.2).toFixed(2)}€
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📏</span>
                </div>
                Choisissez votre taille
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {allSizes.map(size => {
                  const stock = getSizeStock(size._id);
                  const isAvailable = stock > 0;
                  const isSelected = selectedSize === size._id;

                  return (
                    <button
                      key={size._id}
                      onClick={() => isAvailable && handleSizeSelect(size._id)}
                      disabled={!isAvailable}
                      className={`relative h-12 rounded-xl font-bold transition-all duration-300 transform ${
                        isSelected
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105 ring-4 ring-purple-200"
                          : isAvailable
                            ? "bg-white hover:bg-purple-50 text-slate-800 border-2 border-slate-200 hover:border-purple-300 hover:scale-105 shadow-md"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"
                      }`}
                    >
                      {size.eu_size}
                      {!isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-0.5 bg-red-500 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedSize && filteredVariantsBySize.length > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎨</span>
                  </div>
                  Couleurs disponibles
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredVariantsBySize.map(variant => {
                    const isAvailable = variant.available && variant.stock > 0;
                    const isSelected = selectedVariant?.id === variant.id;

                    return (
                      <div
                        key={variant.id}
                        onClick={() =>
                          isAvailable && handleVariantSelect(variant)
                        }
                        className={`group cursor-pointer transition-all duration-500 ${
                          !isAvailable
                            ? "cursor-not-allowed opacity-60"
                            : "hover:scale-105"
                        }`}
                      >
                        <div
                          className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                            isSelected
                              ? "ring-4 ring-purple-500 shadow-2xl scale-105"
                              : isAvailable
                                ? "ring-2 ring-slate-200 hover:ring-purple-300 hover:shadow-2xl"
                                : "ring-2 ring-slate-200"
                          }`}
                        >
                          <div
                            className="h-2 w-full"
                            style={{
                              backgroundColor: variant.color_id.hex_code,
                            }}
                          />

                          <div className="aspect-square relative">
                            <img
                              src={variant.src}
                              alt={`${product.title} - ${variant.color_id.name}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute top-3 right-3">
                              {isAvailable ? (
                                <div className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                  {variant.stock}
                                </div>
                              ) : (
                                <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                  Épuisé
                                </div>
                              )}
                            </div>

                            {isSelected && (
                              <div className="absolute inset-0 bg-purple-600/30 flex items-center justify-center">
                                <div className="bg-white rounded-full p-3 shadow-xl animate-pulse">
                                  <svg
                                    className="w-6 h-6 text-purple-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="p-4 bg-white">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                                style={{
                                  backgroundColor: variant.color_id.hex_code,
                                }}
                              />
                              <div>
                                <p className="font-semibold text-slate-800 text-sm">
                                  {variant.color_id.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  Stock: {variant.stock}
                                </p>
                              </div>
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
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🛒</span>
                  </div>
                  Quantité
                </h3>
                {isVariantAvailable() ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <div className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-200 min-w-[80px] text-center shadow-md">
                        <span className="text-2xl font-bold text-slate-800">
                          {quantity}
                        </span>
                      </div>
                      <button
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= getVariantStock()}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-600">
                        Stock disponible
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        {getVariantStock()} articles
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <p className="text-red-600 font-semibold text-lg">
                      Cette variante n&apos;est plus en stock
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-6">
              {addToCartMessage && (
                <div
                  className={`p-6 rounded-3xl text-center font-semibold text-lg shadow-lg border-2 ${
                    addToCartMessage.includes("✅")
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {addToCartMessage}
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={
                  isAddingToCart || !selectedVariant || !isVariantAvailable()
                }
                className={`group relative overflow-hidden w-full py-6 rounded-3xl text-xl font-bold shadow-2xl transform transition-all duration-500 ${
                  isAddingToCart || !selectedVariant || !isVariantAvailable()
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 hover:scale-105 hover:shadow-3xl"
                } text-white`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex justify-center items-center gap-4">
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      Ajout en cours...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M9 19a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {selectedVariant && isVariantAvailable()
                        ? `Ajouter au Panier • ${quantity} article${quantity > 1 ? "s" : ""}`
                        : "Sélectionnez une variante"}
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
