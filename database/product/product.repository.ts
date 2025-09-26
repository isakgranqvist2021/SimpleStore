import { BaseDocument, Repository } from 'database/database';
import { ProductOption } from 'database/product-option/product-option.model';
import { ProductReview } from 'database/review/review.model';
import { Filter } from 'mongodb';

export interface ProductDocument extends BaseDocument {
  name: string;

  slug: string;

  price: number;
  compareAtPrice: number | null;

  description: string;
  shortDescription: string;

  images: string[];

  options: ProductOption[];
  reviews: ProductReview[];
}

class ProductRepository extends Repository<ProductDocument> {
  static _collectionName = 'products';

  constructor() {
    super(ProductRepository._collectionName);
  }

  async findOne(filter: Filter<ProductDocument>) {
    const collection = await this.getCollection();

    return collection.findOne(filter);
  }

  async findAll() {
    const collection = await this.getCollection();

    return collection.find().toArray();
  }
}

export const productRepository = new ProductRepository();
