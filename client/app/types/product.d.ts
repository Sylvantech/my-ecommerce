export interface Asset {
  _id: string;
  url: string;
  alt: string;
}

export interface ProductSize {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  category_id?: Category | string;
  price: string;
  color?: string;
  composition?: string;
  size?: string;
  in_stock?: boolean;
  stock?: number;
  weight_in_gr?: number;
  is_promo?: boolean;
  is_new?: boolean;
  assets?: (Asset | string)[];
  sizes?: (ProductSize | string)[];
  created_at?: Date;
  updated_at?: Date;
}
