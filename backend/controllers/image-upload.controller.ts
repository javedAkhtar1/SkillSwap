import { Request, Response } from "express";
import { ApiError } from "../lib/api-error";
import { errorResponse, successResponse } from "../lib/api-response";
import { uploadImage } from "../services/image-upload.service";

export const uploadImageController = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return errorResponse(res, "No file provided", 400);
    }

    const imageUrl = await uploadImage(file);

    return successResponse(res, { imageUrl }, 201);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected file upload error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
};
