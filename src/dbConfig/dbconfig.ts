import mongoose from 'mongoose';

const MONGO_DB = process.env.MONGO_URL;

if (!MONGO_DB) throw new Error('MONGODB_DB not defined');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGO_DB}`).then(mongoose => mongoose)
  }

  cached.conn = await cached.promise;
  return cached.conn
}

