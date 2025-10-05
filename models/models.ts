import { order } from './order';
import { product } from './product';
import { review } from './review';

export const models = {
  product: product.model,
  order: order.model,
  review: review.model,
};
