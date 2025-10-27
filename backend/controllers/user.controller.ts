import { ApiError } from "../lib/api-error";
import { errorResponse, successResponse } from "../lib/api-response";
import {
  completeProfile,
  changePassword,
  getProfileByUsername,
} from "../services/user.service";
import { Request, Response } from "express";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";

interface Params {
  username: string;
}

export async function getProfileByUsernameController(
  req: Request<Params>,
  res: Response
) {
  try {
    const { username } = req.params;
    const user = await getProfileByUsername(username);

    return successResponse(res, user, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(error, error.message, 500);
  }
}

// -------------------- CHANGE PASSWORD --------------------
export async function changePasswordController(req: Request, res: Response) {
  try {
    // Convert Express req to Next.js-like object
    const nextReq = {
      headers: req.headers,
      cookies: req.cookies, // if you use cookie-parser
    };

    const token = await getToken({
      req: nextReq as any, // cast to satisfy types
      secret: process.env.NEXTAUTH_SECRET,
    });

    // console.log("Session token:", token);

    if (!token || !token.email) return errorResponse(res, "Unauthorized", 401);

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return errorResponse(
        res,
        "Old password and new password are required",
        400
      );
    }

    await changePassword({
      email: token.email,
      oldPassword,
      newPassword,
    });

    return successResponse(res, { message: "Password changed successfully" }, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}

// -------------------- COMPLETE PROFILE --------------------
export async function completeProfileController(req: Request, res: Response) {
  try {
    const nextReq = {
      headers: req.headers,
      cookies: req.cookies, // if you use cookie-parser
    };

    const token = await getToken({
      req: nextReq as any, // cast to satisfy types
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || !token.email) throw new ApiError("Unauthorized", 401);

    const { age, bio, profilePicture, skillsToLearn, skillsToTeach } = req.body;

    const result = await completeProfile(
      age,
      bio,
      profilePicture,
      skillsToLearn,
      skillsToTeach,
      token.email
    );

    return successResponse(res, result, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}
