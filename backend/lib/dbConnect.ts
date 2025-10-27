import mongoose from "mongoose";

export default async function dbConnect() {
  const MONGO_URI = process.env.MONGODB_URI as string;
  console.log("MONGO_URI:", MONGO_URI);
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable in your backend/.env file"
    );
  }

  if (mongoose.connection.readyState >= 1) {
    console.log("✅ MongoDB already connected");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connection established");
    return mongoose.connection;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
