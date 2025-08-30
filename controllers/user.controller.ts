import { getProfileByUsername } from "@/services/user.service";
import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function getProfileByUsernameController(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
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
