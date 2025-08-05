import type { Product } from "./product";

export interface Cart {
  id: number;
  _id?: string;
  user_id?: string | null;
  anonymous_user_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface CartProduct {
  _id: string;
  cart_id: string;
  product_id: string | Product;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CartResponse {
  success: boolean;
  data?: Cart;
  error?: string;
}

export interface CartProductResponse {
  success: boolean;
  data?: CartProduct;
  error?: string;
}
