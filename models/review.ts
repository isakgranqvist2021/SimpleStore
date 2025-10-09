import mongoose, { InferSchemaType, Model } from 'mongoose';

const name = 'Review';

const ReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  rating: { type: Number, required: true },
  comment: { type: String, default: null },
});

export type ReviewType = InferSchemaType<typeof ReviewSchema>;
export type ReviewModel = Model<ReviewType>;

const model =
  (mongoose.models[name] as ReviewModel) || mongoose.model(name, ReviewSchema);

export const review = { name, model };
