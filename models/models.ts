import order from './order.schema';
import product from './product.schema';
import review from './review.schema';

const models = {
  product: product.model,
  order: order.model,
  review: review.model,
};

export default models;
