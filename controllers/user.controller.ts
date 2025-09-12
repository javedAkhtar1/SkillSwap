import { changePassword, getProfileByUsername } from "@/services/user.service";
import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

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

export async function changePasswordController(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return errorResponse("Unauthorized", 401);
    }
    const email = session.user.email;
    const { oldPassword, newPassword } = await req.json();

    if (!email || !oldPassword || !newPassword) {
      return errorResponse("Email, old password, and new password are required", 400);
    }
    await changePassword({ email, oldPassword, newPassword });
    return successResponse({ message: "Password changed successfully" }, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse("Something went wrong", 500);
  }
}
