export interface ProductOption {
  id: string;

  name: string;

  values: string[];

  disabled?: boolean;

  defaultSelected?: boolean;
}
