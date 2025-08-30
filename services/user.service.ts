import { ApiError } from "@/lib/api-error";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";

export async function getProfileByUsername(username: string) {
  await dbConnect();

  const user = await User.findOne({ username }).select("-password");
  if (!user) {
    throw new ApiError("User not found with that username", 404);
  }
  return user;
}
