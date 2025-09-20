import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import { uploadImage } from "@/services/image-upload.service";

export const uploadImageController = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File; // this get file name is important and should match the key used in the formData

  if (!file) {
    throw new ApiError("No file provided", 400);
  }

  try {
    const imageUrl = await uploadImage(file);
    return successResponse({ imageUrl }, 201);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse("Something went wrong", 500);
  }
};
