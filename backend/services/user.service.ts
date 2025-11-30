import { ApiError } from "../lib/api-error";
import dbConnect from "../lib/dbConnect";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { skills, TSkill, TUpdateProfilePayload } from "../types/types";

export async function getProfile(query: string) {
  // Try username first, then email
  const user = await User.findOne({
    $or: [{ username: query }, { email: query }],
  })
    .select({
      password: 0,
      otp: 0,
      otpExpiry: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    })
    .populate("friends", "username email profilePicture");

  if (!user) {
    throw new ApiError("User not found with that username or email", 404);
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

export async function updateProfile(
  userId: string,
  updates: TUpdateProfilePayload
) {
  if (updates.skillsToTeach) {
    updates.skillsToTeach = updates.skillsToTeach.filter((s) =>
      skills.includes(s)
    ) as TSkill[];
  }

  if (updates.skillsToLearn) {
    updates.skillsToLearn = updates.skillsToLearn.filter((s) =>
      skills.includes(s)
    ) as TSkill[];
  }

  // Handle unique username check
  if (updates.username) {
    const exists = await User.findOne({ username: updates.username });
    if (exists && exists._id.toString() !== userId) {
      throw new ApiError("Username already taken", 400);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  ).select("-password -otp -otpExpiry"); // Hide sensitive fields

  if (!updatedUser) throw new ApiError("User not found", 404);

  return updatedUser;
}

export async function getAllUsers(page: number = 1, limit: number = 12, search = "") {
  const skip = (page - 1) * limit;

  const filter: any = { profileComplete: true };

  if (search.trim()) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
      { skillsToTeach: { $regex: search, $options: "i" } },
      { skillsToLearn: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(filter)
    .select("-password -otp -otpExpiry -__v -createdAt -updatedAt")
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

