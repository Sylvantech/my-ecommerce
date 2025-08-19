export type OwnerType = "all" | "user" | "anonymous";

export interface UserLite {
  _id: string;
  username: string;
  email: string;
}

export interface CartAdminProps {
  search?: string;
  ownerType?: OwnerType;
  dateFrom?: string;
  dateTo?: string;
  refresh: number;
}

export interface CartDoc {
  _id: string;
  id: number;
  user_id?: string | UserLite | null;
  anonymous_user_id?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CartProductDoc {
  _id: string;
  cart_id: string;
  product_id: { title?: string; price?: number } | string;
  variant_id?:
    | {
        _id: string;
        color_id?: { name: string };
        size_id?: { eu_size: string };
        src?: string;
      }
    | string;
  quantity: number;
}
