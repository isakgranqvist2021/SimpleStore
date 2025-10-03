export interface ProductReview {
  id: string;

  rating: number;
}

export interface ProductOption {
  id: string;

  name: string;

  values: string[];

  disabled?: boolean;

  defaultSelected?: boolean;
}
