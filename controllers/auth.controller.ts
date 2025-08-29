import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
  registerUser,
  verifyEmail,
} from "@/services/auth.service";

export async function signupController(req: Request) {
  try {
    const { name, username, email, password } = await req.json();

    if (!name || !username || !email || !password) {
      return errorResponse("All fields are required", 400);
    }

    const user = await registerUser({ name, username, email, password });

    return successResponse(
      { message: "User registered successfully", userId: user._id },
      201
    );
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

// verify email controller
export async function verifyEmailController(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return errorResponse("Email and OTP are required", 400);
    }
    await verifyEmail({ email, otp });

    return successResponse({ message: "Email verified successfully" }, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse("Something went wrong", 500);
  }
}
