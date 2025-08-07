import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Database Already Connected!");
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      console.log("Database connection requested...");
      await mongoose.connect(MONGO_URI);
      console.log("Database connection request resolved. DB Connected!");
      return mongoose.connection;
    } catch (err) {
      console.log("Database connection request failed!");
      console.log(err);
    }
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database Connected!");
  } catch (err) {
    cached.promise = null;
    console.log("Database Connection failed!");
    console.log(err);
    process.exit(1);
  }
  return cached.conn;
}

export default dbConnect;
