import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { productService } from "~/services/productService";

interface ProductAsset {
  _id: string;
  url: string;
  alt: string;
}

interface Product {
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

export function meta() {
  return [
    { title: "Login - E-commerce" },
    { name: "product", content: "Product" },
  ];
}

export default function Product() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState<number>(1);

  const [product, setProduct] = useState<Product | null>(null);

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

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="mt-15 flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-10 px-4 py-8">
        <div className="flex flex-col items-center gap-6 w-full lg:w-1/2 relative">
          <p className="flex items-center justify-center absolute left-10 top-7 text-xs bg-yellow-400 rounded-full w-24 h-6 font-extrabold border-none shadow">
            ✨ Bestseller
          </p>
          {product.assets && product.assets.length > 0 ? (
            <img
              src={product.assets[0].url}
              alt={product.title}
              className="bg-gray-100 rounded-3xl shadow-lg w-full max-w-xs sm:max-w-md lg:max-w-lg aspect-square object-cover"
            />
          ) : (
            <div className="bg-gray-100 rounded-3xl shadow-lg w-full max-w-xs sm:max-w-md lg:max-w-lg aspect-square flex items-center justify-center text-gray-400">
              Pas d&apos;image
            </div>
          )}
          <div className="flex space-x-3 justify-center w-full">
            {product.assets &&
              product.assets.map(value => (
                <div
                  key={value._id}
                  className="bg-gray-100 rounded-xl shadow-lg w-16 h-16 flex items-center justify-center"
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
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl mt-2 mb-2 font-bold text-gray-900">
            {product.title}
          </h1>
          {/* REMPLACER PAR LE composant des étoiles */}
          <div className="flex flex-row items-center gap-4">
            <p className="text-purple-700 text-2xl sm:text-3xl font-semibold">
              {product.price}€
            </p>
            <p>{product.is_promo && "Votre produit est en promotion"}</p>
            {/* REMPLACER PAR LE COMPOSANT "AJOUTER UN AVIS" */}
          </div>
          <section className="w-full bg-pink-50 p-5 space-y-4 border border-pink-200 rounded-lg">
            <h2 className="text-purple-700 text-lg font-semibold">
              À Propos de ce Produit
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </section>
          <div className="space-y-4">
            <h3 className="font-semibold">Caractéristiques :</h3>
            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                🌈 Design coloré unique
              </span>
              <span className="flex items-center gap-2">
                ✨ Matière ultra-douce en coton bio
              </span>
              <span className="flex items-center gap-2">
                🧵 Coutures renforcées
              </span>
              <span className="flex items-center gap-2">
                🎨 Création exclusive SockLand
              </span>
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
          <div className="space-y-2">
            <h3 className="font-semibold">Couleur :</h3>
            <div className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 border border-white rounded-lg shadow-lg bg-gradient-to-br from-pink-300 to-violet-400"></div>
              <p className="text-gray-700">{product.color}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Taille :</h3>
            {product.size ? (
              <p>{product.size}</p>
            ) : (
              <select
                className="bg-white p-2 w-full rounded-lg border-2 border-gray-200 text-sm"
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
          <div className="space-y-2">
            <h3 className="font-semibold">Quantité :</h3>
            {product.in_stock ? (
              <div className="flex flex-row items-center gap-4">
                <button
                  className="bg-white h-10 w-10 rounded-full border border-gray-200 text-xl font-bold hover:bg-gray-100 transition"
                  onClick={handleSoustraction}
                >
                  -
                </button>
                <p className="w-8 text-center">{quantity}</p>
                <button
                  className="bg-white h-10 w-10 rounded-full border border-gray-200 text-xl font-bold hover:bg-gray-100 transition"
                  onClick={handleAddition}
                >
                  +
                </button>
              </div>
            ) : (
              "Nous sommes désolés, votre produit n'est plus en stock"
            )}
          </div>
          <div className="mt-4">
            <button className="flex justify-center items-center bg-gradient-to-r from-pink-300 to-violet-400 text-white px-8 py-3 rounded-full w-full max-w-xs shadow-lg hover:scale-105 transition">
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
                className="lucide lucide-shopping-cart w-5 h-5 mr-2"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              Ajouter au Panier
            </button>
            <hr className="border-[0.5] border-gray-300 w-full mt-7" />
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 text-sm text-gray-700 w-full">
              <div className="flex flex-col items-center px-3 sm:border-r border-gray-200 last:border-none">
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
                  className="lucide lucide-truck w-8 h-8 text-green-500 mx-auto mb-2"
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <path d="M15 18H9"></path>
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
                <span className="font-semibold">Livraison Rapide</span>
                <span className="text-xs text-gray-500">24-48h</span>
              </div>
              <div className="flex flex-col items-center px-3 sm:border-r border-gray-200 last:border-none">
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
                  className="lucide lucide-shield w-8 h-8 text-blue-500 mx-auto mb-2"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
                <span className="font-semibold">Garantie Qualité</span>
                <span className="text-xs text-gray-500">30 jours</span>
              </div>
              <div className="flex flex-col items-center px-3">
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
                  className="lucide lucide-rotate-ccw w-8 h-8 text-purple-500 mx-auto mb-2"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
                <span className="font-semibold">Retour Gratuit</span>
                <span className="text-xs text-gray-500">Sans frais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
