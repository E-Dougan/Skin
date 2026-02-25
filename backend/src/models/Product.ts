export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  skin_types: string[]; // JSON array
  ingredients?: string;
  image_url?: string;
  created_at?: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  category: string;
  skin_types: string[];
  ingredients?: string;
  image_url?: string;
}