import "dotenv/config";
import dbConnect from "../lib/dbConnect";
import User from "../models/user.model";

async function migrateUsers() {
  await dbConnect();

  const result = await User.updateMany(
    {
      $or: [
        { isEmailVerified: { $exists: false } },
        { isActive: { $exists: false } },
        { otp: { $exists: false } },
        { otpExpiry: { $exists: false } },
      ],
    },
    {
      $set: {
        isEmailVerified: false,
        isActive: false,
        otp: null,
        otpExpiry: null,
      },
    }
  );

  console.log(`✅ Updated ${result.modifiedCount} users`);
  process.exit(0);
}

migrateUsers();
