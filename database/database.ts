import type { Document, ObjectId } from 'mongodb';
import clientPromise from 'services/mongodb';

export class Repository<T extends Document> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getCollection() {
    const client = await clientPromise;

    return client.db().collection<T>(this.collectionName);
  }
}

export interface BaseDocument {
  _id: ObjectId;

  createdAt: number;
  updatedAt: number;
}
