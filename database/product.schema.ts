import mongoose, { InferSchemaType, Model } from 'mongoose';

const name = 'Product';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number, default: null },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  images: { type: [String], default: [] },
  options: { type: Array, default: [] },
  reviews: { type: Array, default: [] },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
});

export type ProductType = InferSchemaType<typeof ProductSchema>;
export type ProductModel = Model<ProductType>;

const model =
  (mongoose.models[name] as ProductModel) ||
  mongoose.model(name, ProductSchema);

export default {
  name,
  model,
};
