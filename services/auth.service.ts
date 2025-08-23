import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { ApiError } from "@/lib/api-error";

const usernameRegex = /^[a-z0-9._]+$/;

export async function registerUser({
  name,
  username,
  email,
  password,
}: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  await dbConnect();

  if (!usernameRegex.test(username)) {
    throw new ApiError(
      "Username can only contain lowercase letters, numbers, underscores, and dots.",
      400
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError("User already exists with this email.", 400);
  }

  const existingUserName = await User.findOne({ username });
  if (existingUserName) {
    throw new ApiError("This username is already taken. Please choose another.", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = "123456" // hard coded for development
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    provider: "credentials",
    profileComplete: false,
    isEmailVerified: false,
    otp,
    otpExpiry,
  });

  return user;
}


// verify email
export async function verifyEmail({ email, otp }: { email: string; otp: string }) {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) throw new ApiError("User not found", 404);

  if (user.emailVerified) {
    throw new ApiError("Email already verified", 400);
  }

  if (!user.otp || !user.otpExpiry) {
    throw new ApiError("No OTP generated", 400);
  }

  if (user.otp !== otp) {
    throw new ApiError("Invalid OTP", 400);
  }

  if (user.otpExpiry < new Date()) {
    throw new ApiError("OTP expired", 400);
  }

  user.isEmailVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  return user;
}

