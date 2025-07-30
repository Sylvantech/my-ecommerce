export interface Asset {
    url: string;
    alt: string;
  }
  
  export interface Category {
    name: string;
  }
  
  export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category?: string;
    image: string;
  }