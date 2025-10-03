import mongoose from 'mongoose';

declare global {
  declare module globalThis {
    var mongoose: {
      conn: mongoose.Mongoose | null;
      promise: Promise<mongoose.Mongoose> | null;
    };
  }
}

export {};
