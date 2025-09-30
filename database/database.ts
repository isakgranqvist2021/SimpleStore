import type { Collection, Document, ObjectId } from 'mongodb';
import clientPromise from 'services/mongodb';

export class Repository<T extends Document> {
  private collectionName: string;

  public collection: Collection<T> | null = null;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async withCollection<J>(fn: (collection: Collection<T>) => Promise<J>) {
    const client = await clientPromise;
    const collection = client.db().collection<T>(this.collectionName);

    return await fn(collection);
  }
}

export interface BaseDocument {
  _id: ObjectId;

  createdAt: number;
  updatedAt: number;
}
