import express, { Request, Response } from "express";
import { errorResponse, successResponse } from "../lib/api-response";
import { credentialLogin, oAuthLogin, registerUser, verifyEmail } from "../services/auth.service";
import { ApiError } from "../lib/api-error";

// -------------------- SIGNUP --------------------
export async function signupController(req: Request, res: Response) {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    const user = await registerUser({ name, username, email, password });

    return successResponse(res, { message: "User registered successfully", userId: user._id }, 201);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}

// -------------------- VERIFY EMAIL --------------------
export async function verifyEmailController(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return errorResponse(res, "Email and OTP are required", 400);
    }

    await verifyEmail({ email, otp });

    return successResponse(res, { message: "Email verified successfully" }, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}

// -------------------- CREDENTIAL LOGIN --------------------
export async function credentialLoginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email and password are required", 400);
    }

    const user = await credentialLogin({ email, password });

    return successResponse(res, { message: "Login successful", user }, 200);
  }  catch (err) {
    if (err instanceof ApiError) {
      return res.status(err.status).json({
        success: false,
        message: err.message,
        code:
          err.message.includes("Email not verified") ? "EMAIL_NOT_VERIFIED" : null,
      });
    }

    console.error("Unexpected login error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function oAuthController(req: Request, res: Response) {
  try {
    const { name, email, image } = req.body;

    if (!email) {
      return errorResponse(res, "Email is required", 400);
    }

    const result = await oAuthLogin({ name, email, image });

    return successResponse(res, { user: result }, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}