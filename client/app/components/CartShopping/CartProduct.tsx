import { useState, useEffect } from "react";
import { cartService } from "~/services/cartService";

interface Product {
  title: string;
  price: number | { $numberDecimal: string };
  assets?: [{ url: string }];
}

interface VariantColor {
  name: string;
  hex_code: string;
}
interface VariantSize {
  eu_size: string;
}

interface Variant {
  src: string;
  stock: number;
  color_id: VariantColor;
  size_id: VariantSize;
}

interface CartProductItem {
  _id: string;
  id: number;
  quantity: number;
  product_id: Product;
  variant_id: Variant;
}

interface CartProductProps {
  onCartUpdate?: (data: { subtotal: number; itemCount: number }) => void;
}

export default function CartProduct({ onCartUpdate }: CartProductProps) {
  const [quantities, setQuantities] = useState<number[]>([]);
  const [cartProduct, setCartProduct] = useState<CartProductItem[] | null>(
    null
  );

  useEffect(() => {
    async function getCartProduct() {
      const res = await cartService.getCartProduct();
      if (res.success) {
        const items = res.data as CartProductItem[];
        setCartProduct(items);
        setQuantities(items.map(item => item.quantity));
      } else {
        setCartProduct([]);
        setQuantities([]);
        if (onCartUpdate) onCartUpdate({ subtotal: 0, itemCount: 0 });
      }
    }
    getCartProduct();
  }, []);

  useEffect(() => {
    if (cartProduct && onCartUpdate) {
      const subtotal = cartProduct.reduce((total, item, index) => {
        const raw = item.product_id?.price;
        const price =
          typeof raw === "number" ? raw : Number(raw?.$numberDecimal ?? 0);
        const quantity = quantities[index] || 0;
        return total + price * quantity;
      }, 0);

      const itemCount = quantities.reduce((total, qty) => total + qty, 0);

      onCartUpdate({ subtotal, itemCount });
    }
  }, [cartProduct, quantities, onCartUpdate]);

  const handleAddition = async (
    index: number,
    stock: number,
    cartProductId: string
  ) => {
    const copyQuantity = [...quantities];
    if (copyQuantity[index] < stock) {
      const newQuantity = copyQuantity[index] + 1;
      copyQuantity[index] = newQuantity;
      setQuantities(copyQuantity);

      const result = await cartService.updateCartProductQuantity(
        cartProductId,
        newQuantity
      );
      if (!result.success) {
        copyQuantity[index] = copyQuantity[index] - 1;
        setQuantities(copyQuantity);
        console.error("Erreur lors de la mise à jour :", result.error);
      }
    }
  };

  const handleSoustraction = async (index: number, cartProductId: string) => {
    const copyQuantity = [...quantities];
    if (copyQuantity[index] > 1) {
      const newQuantity = copyQuantity[index] - 1;
      copyQuantity[index] = newQuantity;
      setQuantities(copyQuantity);

      const result = await cartService.updateCartProductQuantity(
        cartProductId,
        newQuantity
      );
      if (!result.success) {
        copyQuantity[index] = copyQuantity[index] + 1;
        setQuantities(copyQuantity);
        console.error("Erreur lors de la mise à jour :", result.error);
      }
    }
  };

  const handleDelete = async (index: number, cartProductId: string) => {
    const result = await cartService.deleteCartProduct(cartProductId);
    if (result.success) {
      const newCartProducts = cartProduct!.filter((_, i) => i !== index);
      const newQuantities = quantities.filter((_, i) => i !== index);
      setCartProduct(newCartProducts);
      setQuantities(newQuantities);
    } else {
      console.error("Erreur lors de la suppression :", result.error);
    }
  };

  return (
    <div className="space-y-4">
      {Array.isArray(cartProduct) &&
        cartProduct.map((value, index) => {
          const product = value.product_id;
          const variant = value.variant_id;
          const rawPrice = product.price;
          const unitPrice =
            typeof rawPrice === "number"
              ? rawPrice
              : Number(rawPrice?.$numberDecimal ?? 0);

          return (
            <div
              key={value._id}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-purple-100 hover:border-pink-200"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <img
                    src={variant?.src || product.assets?.[0]?.url}
                    alt="Image du produit ajouté au panier"
                    className="w-24 h-24 bg-gray-100 rounded-2xl shadow-lg object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                          style={{
                            backgroundColor:
                              variant?.color_id?.hex_code || "#ccc",
                          }}
                        ></span>
                        <span className="text-gray-600 text-sm font-medium">
                          {variant?.color_id?.name || "-"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm">Taille:</span>
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full text-sm font-semibold text-purple-700">
                          {variant?.size_id?.eu_size || "-"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {unitPrice.toFixed(2)} €
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="w-10 h-10 rounded-full border border-purple-200 bg-white hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-purple-600 font-semibold"
                    onClick={() => handleSoustraction(index, value._id)}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                    {quantities[index]}
                  </span>
                  <button
                    className="w-10 h-10 rounded-full border border-purple-200 bg-white hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-purple-600 font-semibold"
                    onClick={() =>
                      handleAddition(index, variant?.stock ?? 0, value._id)
                    }
                  >
                    +
                  </button>
                  <button
                    className="ml-2 p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-200"
                    onClick={() => handleDelete(index, value._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Sous-total pour cet article:
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {(unitPrice * Number(quantities[index])).toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
