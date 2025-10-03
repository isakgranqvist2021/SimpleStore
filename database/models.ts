import order from './order.schema';
import product from './product.schema';

const models = {
  product: product.model,
  order: order.model,
};

export default models;
