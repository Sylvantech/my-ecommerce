import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

const ProductsCard = ({ product }: ProductCardProps) => {
  const { title, assets, price, category_id, description } = product;

  const imageUrl =
    assets && assets.length > 0
      ? typeof assets[0] === "string"
        ? assets[0]
        : assets[0].url
      : undefined;

  const categoryName =
    typeof category_id === "string"
      ? category_id
      : (category_id?.name ?? "Sans catégorie");

  const formatPrice = (
    price: number | string | { $numberDecimal: string } | null | undefined
  ): string => {
    if (
      typeof price === "object" &&
      price !== null &&
      "$numberDecimal" in price
    ) {
      return `${parseFloat(price.$numberDecimal).toFixed(2)}€`;
    }
    if (typeof price === "number") {
      return `${price.toFixed(2)}€`;
    }
    if (typeof price === "string") {
      const numPrice = parseFloat(price);
      return isNaN(numPrice) ? "0.00€" : `${numPrice.toFixed(2)}€`;
    }
    return "0.00€";
  };

  function handleCLick(id: number) {
    window.location.href = `/product/${id}`;
  }

  return (
    <div
      className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      onClick={() => handleCLick(product.id)}
    >
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 relative">
        {product.is_promo && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
            🔥 PROMO
          </div>
        )}

        <div className="relative overflow-hidden">
          <div
            className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 bg-center bg-cover transition-transform duration-700 "
            style={{
              backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
            }}
          >
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl text-xs font-bold text-gray-800 shadow-lg border border-white/50 transform group-hover:scale-110 transition-transform duration-300">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {categoryName}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
            {title}
          </h2>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {formatPrice(price)}
              </span>
              {product.is_promo && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(typeof price === "number" ? price * 1.2 : price)}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">(4.2)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>En stock</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span>Livraison 24h</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
              <svg
                className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="cursor-pointer">Voir le produit</span>
            </button>

            <button className="w-12 h-12 bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group/heart">
              <svg
                className="w-5 h-5 group-hover/heart:scale-125 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ProductsCard;
