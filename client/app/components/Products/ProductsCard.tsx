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
    <section
      id="catalogue"
      className="p-5"
      onClick={() => handleCLick(product.id)}
    >
      <div className="bg-white w-90 hover:bg-violet-100 transition duration-300 rounded-lg p-1 shadow-lg cursor-pointer">
        <div
          id="image"
          className="relative w-88 h-85 bg-center rounded-t-lg bg-cover"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          }}
        >
          <div className="absolute top-2 left-2 bg-white px-2 py-1 ring-2 ring-gray-300 rounded-xl text-xs font-baloo font-semibold text-black shadow-sm">
            {categoryName}
          </div>
        </div>
        <div className="ml-3 mr-3">
          <h2 className="text-purple-800 text-xl font-baloo font-bold mt-3 truncate">
            {title}
          </h2>
          <h3 className="text-black text-sm font-baloo mt-2 line-clamp-2">
            {description}
          </h3>
          <div className="flex justify-between mb10 items-center mb-3 -mt-3 pt-4">
            <div className="flex flex-col">
              <span className="text-purple-800 font-extrabold text-xl font-baloo">
                {formatPrice(price)}
              </span>
            </div>
            <button className="text-white font-semibold text-sm px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-md hover:scale-105 transition-transform">
              Voir
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsCard;
