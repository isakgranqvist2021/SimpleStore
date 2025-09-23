export interface ProductOption {
  id: string;
  name: string;
  values: string[];
  disabled?: boolean;
  defaultSelected?: boolean;
}

export interface ProductReview {
  id: string;
  rating: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  description: string;
  shortDescription: string;
  images: string[];
  options: ProductOption[];
  reviews: ProductReview[];
}
