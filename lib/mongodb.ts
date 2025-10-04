import mongoose from 'mongoose';

type MongooseGlobal = {
  conn: {
    isConnected?: boolean;
  } | null;
  promise?: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseGlobal | undefined;
}

const globalMongoose: MongooseGlobal = global._mongoose || {
  conn: null,
  promise: null,
};
const MONGODB_URI = process.env.MONGO_DB_DATABASE_URL!;

if (!process.env.MONGO_DB_DATABASE_URL) {
  throw new Error(
    'Please define the MONGO_DB_DATABASE_URL environment variable inside .env',
  );
}

export async function connect() {
  // If connection already exists and is connected, return it
  if (globalMongoose.conn && globalMongoose.conn.isConnected) {
    return;
  }

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

export async function disconnect() {
  if (globalMongoose.conn && globalMongoose.conn.isConnected) {
    await mongoose.disconnect();
    globalMongoose.conn = { isConnected: false };
  }
}
