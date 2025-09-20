import { ApiError } from "@/lib/api-error";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function getProfileByUsername(username: string) {
  await dbConnect();
  const isValidUser = await User.findOne({ username });
  if (!isValidUser) {
    throw new ApiError("User not found with that username", 404);
  }

  const user = await User.findOne({ username }).select({
    password: 0,
    otp: 0,
    otpExpiry: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  if (!user) {
    throw new ApiError("User not found with that username", 404);
  }
  return user;
}

export async function changePassword({
  email,
  oldPassword,
  newPassword,
}: {
  email: string;
  oldPassword: string;
  newPassword: string;
}) {
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) throw new ApiError("User not found", 404);

  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) throw new ApiError("Invalid old password", 401);

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();

  return user;
}

export async function completeProfile(
  age: number,
  bio: string,
  profilePicture: string,
  skillsToLearn: string[],
  skillsToTeach: string[],
  email: string
) {
  await dbConnect();

  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      age,
      bio,
      profilePicture,
      skillsToLearn,
      skillsToTeach,
      profileComplete: true,
    },
    { new: true, runValidators: true }
  ).select({
    password: 0,
    otp: 0,
    otpExpiry: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  
  if (!updatedUser) throw new ApiError("User not found", 404);
  return updatedUser.toObject();
}
