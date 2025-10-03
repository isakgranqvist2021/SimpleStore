import mongoose, { InferSchemaType, Model } from 'mongoose';

const name = 'Review';

const ReviewSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, default: null },
});

export type ReviewType = InferSchemaType<typeof ReviewSchema>;
export type ReviewModel = Model<ReviewType>;

const model =
  (mongoose.models[name] as ReviewModel) || mongoose.model(name, ReviewSchema);

export default {
  name,
  model,
};
