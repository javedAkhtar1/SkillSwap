import { ApiError } from "../lib/api-error";
import { errorResponse, successResponse } from "../lib/api-response";
import { uploadImage } from "../services/image-upload.service";
import {
  completeProfile,
  changePassword,
  getProfile,
  updateProfile,
  getAllUsers,
} from "../services/user.service";
import { Request, Response } from "express";

interface Params {
  username: string;
}

export async function getProfileController(req: Request, res: Response) {
  try {
    const query = req.query.q as string;

    if (!query) {
      return errorResponse(res, "Missing query parameter 'q'", 400);
    }

    const user = await getProfile(query);

    return successResponse(res, user, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }

    console.error("Unexpected error in getProfileController:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}
// -------------------- CHANGE PASSWORD --------------------
export async function changePasswordController(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const email = user.email;
    // console.log("Session token:", token);

    if (!email) throw new ApiError("Unauthorized", 401);

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return errorResponse(
        res,
        "Old password and new password are required",
        400
      );
    }

    await changePassword({
      email,
      oldPassword,
      newPassword,
    });

    return successResponse(
      res,
      { message: "Password changed successfully" },
      200
    );
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
    const user = (req as any).user;
    // console.log(user, "USERRRR");
    const email = user.email;
    // console.log("eMAIL", email)

    if (!email) throw new ApiError("Unauthorized", 401);

    const { age, bio, profilePicture, skillsToLearn, skillsToTeach } = req.body;

    const result = await completeProfile(
      age,
      bio,
      profilePicture,
      skillsToLearn,
      skillsToTeach,
      email
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

export async function updateProfileController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const updates = req.body;
    const file = req.file;

    // If profile picture is uploaded, upload to Cloudinary
    if (file) {
      const imageUrl = await uploadImage(file);
      updates.profilePicture = imageUrl; // attach new image
    }

    const updatedProfile = await updateProfile(userId, updates);

    return successResponse(res, updatedProfile, 200);

  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const search = (req.query.search as string) || ""; 

    const data = await getAllUsers(page, limit, search);
    return successResponse(res, data);

  } catch (error: any) {
    console.error("Get all users error:", error);
    return errorResponse(res, "Failed to fetch users", 500);
  }
};
