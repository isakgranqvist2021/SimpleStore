export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductReview {
  id: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  description: string;
  images: string[];
  options: ProductOption[];
  reviews: ProductReview[];
}
