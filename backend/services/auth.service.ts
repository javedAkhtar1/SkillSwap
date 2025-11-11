import bcrypt from "bcryptjs";
import dbConnect from "../lib/dbConnect";
import User from "../models/user.model";
import { ApiError } from "../lib/api-error";

const usernameRegex = /^[a-z0-9._]+$/;

// -------------------- REGISTER USER --------------------
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

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(
      "This username is already taken. Please choose another.",
      400
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Dummy OTP for development
  const otp = "123456";
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    provider: "credentials",
    profileComplete: false,
    isEmailVerified: false,
    isActive: false,
    otp,
    otpExpiry,
  });

  return user;
}

// -------------------- VERIFY EMAIL --------------------
export async function verifyEmail({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) throw new ApiError("User not found", 404);

  if (user.isEmailVerified) {
    throw new ApiError("Email already verified", 400);
  }

  if (!user.otp || !user.otpExpiry) {
    throw new ApiError("No OTP generated", 400);
  }

  if (user.otp !== otp) {
    throw new ApiError("Invalid OTP", 400);
  }

  user.isEmailVerified = true;
  user.isActive = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  return user;
}

// -------------------- CREDENTIAL LOGIN --------------------
export async function credentialLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) throw new ApiError("User not found", 404);

  if (!user.isEmailVerified) {
    throw new ApiError(
      "Email not verified. Please verify your email.",
      403
    );
  }

  if (user.isEmailVerified && !user.isActive) {
    throw new ApiError("Account is disabled. Please contact support.", 403);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new ApiError("Invalid password", 401);

  // Return only public info
  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
  };
}


export async function oAuthLogin({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: name || "Skillswap User",
      username: email.split("@")[0],
      email,
      profilePicture: image || "",
      provider: "google",
      profileComplete: false,
      isEmailVerified: true,
      isActive: true,
    });
  }

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
  };
}