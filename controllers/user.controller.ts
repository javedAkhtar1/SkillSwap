import { getProfileByUsername } from "@/services/user.service";
import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";
import User from "@/models/user.model";

export async function getProfileByUsernameController(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const isValidUser = await User.findOne({ username });
    if (!isValidUser) {
      throw new ApiError("User not found with that username", 404);
    }
    const user = await getProfileByUsername(username);

    return successResponse(user, 200);
  } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse("Something went wrong", 500);
    }
}
