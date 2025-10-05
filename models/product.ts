import mongoose, { InferSchemaType, Model } from 'mongoose';

const name = 'Product';

const OptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  values: { type: [String], required: true },
});

export type OptionType = InferSchemaType<typeof OptionSchema>;

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number, default: null },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  images: { type: [String], default: [] },
  options: { type: [OptionSchema], default: [] },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
});

export type ProductType = InferSchemaType<typeof ProductSchema>;
export type ProductModel = Model<ProductType>;

const model =
  (mongoose.models[name] as ProductModel) ||
  mongoose.model(name, ProductSchema);

export const product = { name, model };
