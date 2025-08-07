export interface ProductSize {
  _id: string;
  size: string;
}

export interface Category {
  _id: string;
  name: string;
}
export interface Product {
  id: number;
  title: string;
  description?: string;
  category_id?: string; 
  composition?: string;
  weight_in_gr?: number;
  is_promo?: boolean;
  is_new?: boolean;
  src: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}
