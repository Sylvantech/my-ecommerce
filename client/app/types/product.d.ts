export interface ProductSize {
  _id: string;
  size: string;
}

export interface Category {
  _id: string;
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  category?: Category;
  composition?: string;
  weight_in_gr?: number;
  is_promo?: boolean;
  is_new?: boolean;
  src: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProductSize {
  _id: string;
  size: string;
}

export interface ProductColor {
  _id: string;
  name: string;
  hex_code: string;
}

export interface ProductVariant {
  id: number;
  product_id: string;
  color_id: ProductColor;
  size_id: ProductSize;
  stock: number;
  src: string;
  available: boolean;
  created_at?: Date;
  updated_at?: Date;
}

