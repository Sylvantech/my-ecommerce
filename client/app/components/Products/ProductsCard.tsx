import type { Product, Category } from "../../types/product";

type ProductCardProps = {
  product: Product;
  category?: Category;
};

const ProductsCard = ({ product }: ProductCardProps) => {
  const { title, src, price, description, is_promo, id, category } = product;

  const imageUrl = src;

  const categoryName = category?.name ?? "Sans catégorie";

  const formatPrice = (price: number | undefined): string => {
    if (!price || typeof price !== "number" || isNaN(price)) {
      return "Prix non disponible";
    }
    return `${price.toFixed(2)}€`;
  };

  function handleClick(id: number) {
    window.location.href = `/product/${id}`;
  }

  if (!product || !title) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="text-center text-gray-500">Produit non disponible</div>
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 h-full"
      onClick={() => handleClick(id)}
    >
      <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-violet-400 relative backdrop-blur-sm hover:bg-gradient-to-br hover:from-white hover:to-violet-50/30 h-[560px] w-[400px] flex flex-col">
        {is_promo && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-lg">
            PROMO
          </div>
        )}

        <div className="relative overflow-hidden flex-shrink-0">
          <div
            className="w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 bg-center bg-cover transition-all duration-700 group-hover:scale-110"
            style={{
              backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
            }}
          >
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-gray-700 shadow-lg border border-white/20">
              {categoryName}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
        </div>

        <div className="p-7 flex flex-col flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-violet-700 transition-colors duration-300 leading-snug">
            {title}
          </h2>

          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed font-light">
            {description || "Aucune description disponible"}
          </p>

          <div className="flex items-end justify-between mb-6">
            <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                {formatPrice(price)}
              </span>
              <span
                className={`block h-5 text-sm text-gray-400 line-through font-light mt-1 ${
                  is_promo && price && typeof price === "number" ? "visible" : "invisible"
                }`}
              >
                {is_promo && price && typeof price === "number"
                  ? formatPrice(price * 1.2)
                  : ""}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 transition-colors duration-200 ${i < 4 ? "text-amber-400 group-hover:text-amber-500" : "text-gray-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-2 font-medium">
                (4.2)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-8 mb-6 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium">En stock</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-3.5 h-3.5 text-violet-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span className="font-medium">Livraison 24h</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex-1"></div>

            <button className="w-14 h-14 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-violet-50 hover:to-violet-100 text-gray-600 hover:text-violet-700 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 group/heart border border-gray-200 hover:border-violet-300">
              <svg
                className="w-5 h-5 group-hover/heart:scale-125 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-100/30 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ProductsCard;
