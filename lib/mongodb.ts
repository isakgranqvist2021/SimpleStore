import mongoose from 'mongoose';

type MongooseGlobal = {
  conn: { isConnected?: boolean } | null;
  promise?: Promise<typeof mongoose> | null;
};

declare global {
  var _mongoose: MongooseGlobal | undefined;
}

const globalMongoose: MongooseGlobal = global._mongoose || {
  conn: null,
  promise: null,
};
const MONGODB_URI = process.env.MONGO_DB_DATABASE_URL!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_DB_DATABASE_URL environment variable inside .env',
  );
}

export async function connectDB() {
  // If connection already exists and is connected, return it
  if (globalMongoose.conn && globalMongoose.conn.isConnected) return;

  // If there's an in-flight connection attempt, await it
  if (!globalMongoose.promise) {
    globalMongoose.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        globalMongoose.conn = {
          isConnected: mongooseInstance.connection.readyState === 1,
        };

        return mongooseInstance;
      });
  }

  await globalMongoose.promise;

  // store back to global so HMR/dev doesn't create multiple connections
  global._mongoose = globalMongoose;
}
