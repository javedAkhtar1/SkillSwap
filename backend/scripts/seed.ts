import "../lib/loadEnv"
import mongoose from "mongoose";
import User from "../models/user.model"
import { usersSeed }from "../constants/seedUsers";

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);

  await User.deleteMany({});
  await User.insertMany(usersSeed);

  console.log("users inserted ✔");
  process.exit();
}

seed();
