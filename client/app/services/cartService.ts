import { apiClient } from "./apiClient";
import { CookieHelper } from "~/utils/cookieHelper";
import type {
  Cart,
  CartResponse,
  CartProduct,
  CartProductResponse,
} from "~/types/cart";

export const cartService = {
  async createCart(): Promise<CartResponse> {
    try {
      const accessToken = CookieHelper.getToken("AccesToken");
      if (!accessToken) {
        throw new Error("Vous devez être connecté pour créer un panier");
      }

      const userResponse = await apiClient(
        "http://localhost:3000/api/user/getId",
        {
          method: "POST",
          body: JSON.stringify({}),
        }
      );

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(
          errorData.error ||
            `Erreur lors de la récupération de l'utilisateur: ${userResponse.status}`
        );
      }

      const userData = await userResponse.json();

      const cartResponse = await apiClient("http://localhost:3000/api/cart", {
        method: "POST",
        body: JSON.stringify({
          user_id: userData._id,
        }),
      });

      if (!cartResponse.ok) {
        const errorData = await cartResponse.json();

        if (cartResponse.status === 400 && errorData.cart) {
          const cart: Cart = {
            id: errorData.cart.id,
            _id: errorData.cart._id,
            user_id: errorData.cart.user_id,
            anonymous_user_id: errorData.cart.anonymous_user_id,
            created_at: errorData.cart.created_at
              ? new Date(errorData.cart.created_at)
              : undefined,
          };

          CookieHelper.setToken(errorData.cart._id, "CartId");

          return { success: true, data: cart };
        }

        throw new Error(
          errorData.error || `Erreur HTTP ${cartResponse.status}`
        );
      }

      const cartData = await cartResponse.json();

      const cart: Cart = {
        id: cartData.cart.id,
        _id: cartData.cart._id,
        user_id: cartData.cart.user_id,
        anonymous_user_id: cartData.cart.anonymous_user_id,
        created_at: cartData.cart.created_at
          ? new Date(cartData.cart.created_at)
          : undefined,
      };

      CookieHelper.setToken(cartData.cart._id, "CartId");

      return { success: true, data: cart };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Erreur lors de la création du panier :", errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  async addToCart(
    productId: string,
    quantity: number = 1
  ): Promise<CartProductResponse> {
    try {
      const accessToken = CookieHelper.getToken("AccesToken");
      if (!accessToken) {
        throw new Error(
          "Vous devez être connecté pour ajouter des produits au panier"
        );
      }

      const cartResult = await this.createCart();
      if (!cartResult.success || !cartResult.data) {
        throw new Error(
          cartResult.error || "Impossible de récupérer le panier"
        );
      }

      const cartId = CookieHelper.getToken("CartId");

      const response = await apiClient(
        "http://localhost:3000/api/productCart",
        {
          method: "POST",
          body: JSON.stringify({
            cart_id: cartId,
            product_id: productId,
            quantity: quantity,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      const cartProduct: CartProduct = {
        _id: data.cart_product._id,
        cart_id: data.cart_product.cart_id,
        product_id: data.cart_product.product_id,
        quantity: data.cart_product.quantity,
        created_at: data.cart_product.created_at
          ? new Date(data.cart_product.created_at)
          : undefined,
        updated_at: data.cart_product.updated_at
          ? new Date(data.cart_product.updated_at)
          : undefined,
      };

      return { success: true, data: cartProduct };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Erreur lors de l'ajout au panier :", errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  getCartProduct: async () => {
    const cartId = CookieHelper.getToken("CartId");
    try {
      const response = await fetch(
        "http://localhost:3000/api/productCart/getByCartId",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart_id: cartId }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }
      const data = await response.json();
      return { success: true, data: data.cart_products };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Erreur lors de la récupération du panier :", errorMessage);
      return { success: false, error: errorMessage };
    }
  },
};
