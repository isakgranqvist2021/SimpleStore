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
  constructor() {
    super('products');
  }

  async findOne(filter: Filter<ProductDocument>) {
    return this.withCollection((c) => c.findOne(filter));
  }

  async findAll() {
    return this.withCollection((c) => c.find().toArray());
  }
}

export const productRepository = new ProductRepository();
