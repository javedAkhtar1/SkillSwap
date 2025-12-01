import "../lib/loadEnv";
import mongoose from "mongoose";
import User from "../models/user.model";
import cloudinary from "../lib/cloudinary";
import { usersSeed as rawUsers } from "../constants/seedUsers";

async function uploadAndReplaceImages() {
  return Promise.all(
    rawUsers.map(async (user) => {
      if (!user.profilePicture.startsWith("http")) return user;

      const uploaded = await cloudinary.uploader.upload(user.profilePicture, {
        folder: "skillswap/seed-users",
      });

      return { ...user, profilePicture: uploaded.secure_url };
    })
  );
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const usersSeed = await uploadAndReplaceImages();

    await User.deleteMany({});
    await User.insertMany(usersSeed);

    console.log("Seeded users successfully");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    process.exit();
  }
}

seed();
