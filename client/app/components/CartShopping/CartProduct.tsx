import { useState, useEffect } from "react";
import { cartService } from "~/services/cartService";

interface Product {
  title: string;
  color: string;
  size: string;
  price: { $numberDecimal: string };
  stock: number;
}

interface CartProduct {
  id: number;
  quantity: number;
  product_id: Product;
}

export default function CartProduct() {
  const [quantity, setQuantity] = useState(1);

  const [cartProduct, setCartProduct] = useState<CartProduct[] | null>(null);

  useEffect(() => {
    async function getCartProduct() {
      const res = await cartService.getCartProduct();
      if (res.success) {
        setCartProduct(res.data);
      }
    }
    getCartProduct();
  }, []);

  console.log(cartProduct);

  const handleAddition = () => {
    if (quantity !== stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleSoustraction = () => {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      {Array.isArray(cartProduct) &&
        cartProduct.map((value) => {
          const product = value.product_id;
          return (
            <div
              key={value.id}
              className="bg-white w-85 h-full sm:w-200 sm:p-6 rounded-3xl flex flex-col justify-evenly pt-2 hover:border-2 hover:border-pink-200 mb-5"
            >
              <div className="flex flex-col justify-center sm:flex-row sm:justify-around">
                <div className="flex flex-col items-center sm:flex-row gap-3 mb-5">
                  <img
                    src=""
                    alt="Image du produit ajouté au panier"
                    width={100}
                    height={100}
                    className="bg-gray-100 rounded-2xl shadow-lg mr-3"
                  />
                  <div className="sm:flex sm:flex-col">
                    <p className="text-lg">{product.title}</p>
                    <div className="sm:flex sm:flex-row gap-3 sm:items-center">
                      <p className="text-gray-600 text-sm flex justify-center items-center gap-1">
                        <span
                          className="border border-white w-6 h-6 rounded-full shadow-lg"
                          style={{ backgroundColor: product.color }}
                        ></span>{" "}
                        <span className="text-gray-900 ml-2">
                          {product.color}
                        </span>
                      </p>
                      <p className="flex justify-center items-center">
                        <span className="text-gray-600 text-sm p-2">Taille: </span>{" "}
                        <span className="ml-2 px-2 py-1 border border-gray-200 rounded-full text-xs">
                          {product.size}
                        </span>
                      </p>
                    </div>
                    <p className="text-purple-700 text-xl sm:text-2xl">
                      {product.price?.$numberDecimal} €
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 ml-5">
                  <button
                    className="bg-white rounded-full border border-gray-300 w-10 h-10 hover:border-pink-300 hover:bg-pink-50"
                    onClick={handleSoustraction}
                  >
                    -
                  </button>
                  <p className="text-xl">{value.quantity}</p>
                  <button
                    className="bg-white rounded-full border border-gray-300 w-10 h-10 hover:border-pink-300 hover:bg-pink-50"
                    onClick={handleAddition}
                  >
                    +
                  </button>
                  <button
                    className="hover:text-red-500 hover:bg-pink-50 p-3  hover:flex hover:justify-center hover:items-center hover:rounded-full"
                    onClick={() => setQuantity(1)}
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
                      className="lucide lucide-trash2 w-4 h-4"
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

              <div className="flex flex-col mt-2 p-4 sm:p-0">
                <hr className="text-gray-200" />
                <div className="flex justify-between items-center p-2">
                  <p className="text-gray-600 text-sm">
                    Sous-total pour cet article:
                  </p>
                  <p className="text-purple-700 text-xl sm:text-3xl">
                    {Number(product.price?.$numberDecimal) *
                      Number(value.quantity)}{" "}
                    €
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
