import { storeConfig } from 'config/store-config';
import mongoose, { InferSchemaType, Model } from 'mongoose';
import { product } from './product';

const name = 'Order';

const OrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: product.name,
  },
  checkoutSessionId: { type: String, required: true },
  email: { type: String, default: null },
  amountTotal: { type: Number, required: true },
  currency: {
    type: String,
    required: true,
    default: storeConfig.defaultCurrency,
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid'],
    required: true,
    default: 'unpaid',
  },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
});

export type OrderType = InferSchemaType<typeof OrderSchema>;
export type OrderModel = Model<OrderType>;

const model =
  (mongoose.models[name] as OrderModel) || mongoose.model(name, OrderSchema);

export const order = {
  name,
  model,
};
