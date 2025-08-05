import { useState, useEffect } from "react";
import { useParams } from "react-router";
import StarRating from "~/components/StarRating";
import { productService } from "~/services/productService";
import { cartService } from "~/services/cartService";

interface ProductAsset {
  _id: string;
  url: string;
  alt: string;
}

interface Product {
  id: number; // Added id property
  title: string;
  description: string;
  price: string;
  color: string;
  composition: string;
  size?: string;
  sizes?: string[];
  in_stock: boolean;
  stock: number;
  is_promo: boolean;
  assets: ProductAsset[];
}

export default function Product() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [actualImage, setActualImage] = useState<number>(0);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [addToCartMessage, setAddToCartMessage] = useState<string>("");

  useEffect(() => {
    async function call() {
      const res = await productService.getOne(Number(slug));
      if (res.success && res.data) {
        const fixedData = {
          ...res.data,
          price: String(res.data.price),
        };
        setProduct(fixedData as Product);
      }
    }
    call();
  }, [slug]);

  const updateActualImage = (index: number) => {
    setActualImage(index);
  };

  const handleSoustraction = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddition = () => {
    if (quantity < product!.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    setAddToCartMessage("");

    try {
      const result = await cartService.addToCart(String(product.id), quantity);

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
    return <div>Chargement...</div>;
  }

  return (
    <div className="w-full min-h-screen from-pink-100 via-purple-50 to-blue-100 flex flex-col">
      <div className="mt-15 flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-12 px-6 py-12">
        <div className="flex flex-col items-center gap-8 w-full lg:w-1/2 relative">
          <div className="relative w-full">
            <div className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
              ✨ Bestseller
            </div>
            {product.assets && product.assets.length > 0 ? (
              <div className="relative group">
                <img
                  src={product.assets[actualImage].url}
                  alt={product.title}
                  className="bg-white rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg aspect-square object-cover border-4 border-white group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-xl w-full max-w-xs sm:max-w-md lg:max-w-lg aspect-square flex items-center justify-center text-gray-400 border-4 border-white">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium">Pas d&apos;image</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-4 justify-center w-full overflow-x-auto pb-2">
            {product.assets &&
              product.assets.map((value, index) => (
                <div
                  key={value._id}
                  className={`bg-white rounded-2xl shadow-lg w-20 h-20 flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 cursor-pointer hover:border-purple-400 hover:shadow-xl transform hover:scale-110 ${
                    index === actualImage
                      ? "border-purple-400 ring-2 ring-purple-100"
                      : "border-gray-200"
                  }`}
                  onClick={() => updateActualImage(index)}
                >
                  <img
                    src={value.url}
                    alt={product.title}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-purple-800 bg-clip-text text-transparent leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                <StarRating productId={product.id} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {product.price}€
              </span>
              {product.is_promo && (
                <div className="flex flex-col items-end">
                  <span className="text-lg text-gray-400 line-through">
                    29.99€
                  </span>
                  <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full font-semibold">
                    -20%
                  </span>
                </div>
              )}
            </div>
            {product.is_promo && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                🔥 Promotion limitée !
              </div>
            )}
          </div>

          <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 space-y-6 border-2 border-purple-100 rounded-3xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                À Propos de ce Produit
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
          </section>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Caractéristiques Premium
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                <span className="text-xl">🌈</span>
                <span className="text-gray-700 font-medium">
                  Design coloré unique
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                <span className="text-xl">✨</span>
                <span className="text-gray-700 font-medium">
                  Coton bio ultra-doux
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                <span className="text-xl">🧵</span>
                <span className="text-gray-700 font-medium">
                  Coutures renforcées
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <span className="text-xl">🎨</span>
                <span className="text-gray-700 font-medium">
                  Création exclusive
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 my-2">
            <h3 className="font-bold text-lg text-green-700 mb-4">
              🧵 Composition & Entretien
            </h3>
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Matière(s) :</h4>
              <p className="text-sm text-gray-700 font-medium">
                {product.composition}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Certifications :
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  ✓ OEKO-TEX Standard 100
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  ✓ GOTS Certified
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Instructions d&apos;entretien :
              </h4>
              <ul className="text-xs text-gray-600 space-y-1 list-none">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Lavage en machine à 30°C maximum</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Ne pas utiliser d&apos;eau de javel</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Séchage à l&apos;air libre recommandé</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Repassage à basse température si nécessaire</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🎨</span>
                Couleur
              </h3>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 border-4 border-white rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: product.color }}
                ></div>
                <div>
                  <p className="text-gray-700 font-medium text-lg">
                    {product.color}
                  </p>
                  <p className="text-gray-500 text-sm">Couleur disponible</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📏</span>
                Taille
              </h3>
              {product.size ? (
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold">
                    {product.size}
                  </div>
                  <span className="text-gray-500 text-sm">Taille unique</span>
                </div>
              ) : (
                <select
                  className="bg-gradient-to-r from-gray-50 to-white p-4 w-full rounded-xl border-2 border-gray-200 text-sm font-medium hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  name=""
                  id=""
                >
                  <option value="">Choisissez votre taille</option>
                  {product.sizes &&
                    product.sizes.map((v, index) => (
                      <option key={index}>{v}</option>
                    ))}
                </select>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🛒</span>
              Quantité
            </h3>
            {product.in_stock ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 w-12 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    onClick={handleSoustraction}
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
                    onClick={handleAddition}
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Stock disponible</p>
                  <p className="text-green-600">{product.stock} articles</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 font-medium">
                  Nous sommes désolés, votre produit est plus en stock
                </p>
              </div>
            )}
          </div>

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
              disabled={isAddingToCart || !product.in_stock}
              className={`group relative overflow-hidden ${
                isAddingToCart || !product.in_stock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700"
              } text-white px-8 py-4 rounded-2xl w-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 text-lg font-bold`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                      className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                    >
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    {product.in_stock ? "Ajouter au Panier" : "Produit épuisé"}
                    {product.in_stock && (
                      <span className="ml-2 text-sm opacity-75">
                        ({quantity} article{quantity > 1 ? "s" : ""})
                      </span>
                    )}
                  </>
                )}
              </div>
            </button>

            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
              <hr className="border border-gray-200 w-full mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="group p-4 bg-white rounded-xl shadow-sm border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
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
                      className="w-8 h-8 text-white"
                    >
                      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                      <path d="M15 18H9"></path>
                      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                      <circle cx="17" cy="18" r="2"></circle>
                      <circle cx="7" cy="18" r="2"></circle>
                    </svg>
                  </div>
                  <span className="font-bold text-gray-800 block mb-2">
                    Livraison Express
                  </span>
                  <span className="text-sm text-gray-600 block">
                    24-48h chrono
                  </span>
                  <span className="text-xs text-green-600 font-semibold">
                    GRATUITE dès 50€
                  </span>
                </div>
                <div className="group p-4 bg-white rounded-xl shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
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
                      className="w-8 h-8 text-white"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <span className="font-bold text-gray-800 block mb-2">
                    Garantie Premium
                  </span>
                  <span className="text-sm text-gray-600 block">
                    Satisfaction 30j
                  </span>
                  <span className="text-xs text-blue-600 font-semibold">
                    100% sécurisé
                  </span>
                </div>
                <div className="group p-4 bg-white rounded-xl shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
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
                      className="w-8 h-8 text-white"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                    </svg>
                  </div>
                  <span className="font-bold text-gray-800 block mb-2">
                    Retour Facile
                  </span>
                  <span className="text-sm text-gray-600 block">
                    Échange gratuit
                  </span>
                  <span className="text-xs text-purple-600 font-semibold">
                    Sans condition
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
