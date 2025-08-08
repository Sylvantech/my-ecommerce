import {
  Sparkles,
  Lock,
  Truck,
  Heart,
  CreditCard,
  ChevronLeft,
  Tag,
} from "lucide-react";
import { useState } from "react";
import CartProduct from "~/components/CartShopping/CartProduct";

const MagicSocksCart = () => {
  const [cartData, setCartData] = useState({
    subtotal: 0,
    itemCount: 0,
  });

  const handleCartUpdate = (data: { subtotal: number; itemCount: number }) => {
    setCartData(data);
  };

  const discount = 0;
  const shipping = cartData.subtotal > 50 ? 0 : 3.5;
  const total = cartData.subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-2 flex items-center justify-center lg:justify-start gap-3">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                  Tes Chaussettes
                </span>
                <Sparkles className="text-yellow-400" size={32} />
              </h1>
              <h2 className="text-4xl font-bold text-yellow-300 text-shadow-lg mb-4">
                Créatives !
              </h2>
              <p className="text-gray-700 font-semibold">
                {cartData.itemCount} paire{cartData.itemCount !== 1 ? "s" : ""}{" "}
                de bonheur dans ton panier
              </p>
            </div>

            {/* Mettre la liste des artciles */}
            <div>
              {cartData.itemCount === 0 && (
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-purple-100 text-center mb-6">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Votre panier est vide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez nos chaussettes créatives et ajoutez-en à votre panier !
                  </p>
                </div>
              )}
              <CartProduct onCartUpdate={handleCartUpdate} />
            </div>

            <div className="text-center lg:text-left">
              <button
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto lg:mx-0"
              >
                <ChevronLeft size={20} />
                Continuer mes Achats
              </button>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                  {cartData.itemCount === 0 ? "Commencer" : "Résumé"}
                </h2>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={16} />
                </div>
              </div>

              {cartData.itemCount === 0 ? (
                <div className="text-center mb-10">
                  <p className="text-gray-700 mb-6 font-medium">
                    Votre aventure chaussettes commence ici !
                  </p>
                  <div className="text-4xl mb-4">✨</div>
                  <p className="text-gray-600 text-sm">
                    Ajoutez des produits à votre panier pour voir votre résumé de commande.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 mb-6 font-medium">
                    Ton bonheur en chiffres !
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Sous-total ({cartData.itemCount} article
                        {cartData.itemCount !== 1 ? "s" : ""})
                      </span>
                      <span className="font-bold text-gray-800">
                        {cartData.subtotal.toFixed(2)}€
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Livraison</span>
                      <div className="text-right">
                        {shipping === 0 ? (
                          <span className="font-bold text-green-600">
                            Gratuite !{" "}
                          </span>
                        ) : (
                          <span className="font-bold text-gray-800">
                            {shipping.toFixed(2)}€
                          </span>
                        )}
                      </div>
                    </div>

                    <hr className="border-purple-200" />

                    <div className="flex justify-between items-center text-xl">
                      <span className="font-bold text-gray-800">Total</span>
                      <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {total.toFixed(2)}€
                      </span>
                    </div>
                  </div>

                  {/* Coupon de réduction */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="text-purple-600" size={16} />
                      <span className="text-gray-700 font-medium">Code promo</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Entrez votre code"
                        className="flex-1 px-3 py-2.5 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm text-sm text-black"
                      />
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap">
                        Appliquer
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group">
                      <CreditCard
                        size={20}
                        className="group-hover:rotate-12 transition-transform duration-300"
                      />
                      Passer Commande
                    </button>
                  </div>
                </>
              )}

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <Lock className="text-white" size={20} />
                  </div>
                  <div>
                      <p className="font-bold text-gray-800 text-sm">Paiement</p>
                      <p className="text-gray-600 text-xs">Sécurisé</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <Truck className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Livraison</p>
                    <p className="text-gray-600 text-xs">24-48h</p>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <Heart className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Emballage</p>
                    <p className="text-gray-600 text-xs">Cadeau</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicSocksCart;
