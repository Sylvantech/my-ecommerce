export interface Review {
  id: number;
  content: string;
  verified: boolean;
  user_id: string;
  product_id: string;
  rating: number;
  created_at: string;
  updated_at: string;
}
