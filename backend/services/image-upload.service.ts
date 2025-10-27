import { ApiError } from "../lib/api-error";
import cloudinary from "../lib/cloudinary";

export const uploadImage = async (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "skillswap/profiles",
        resource_type: "image",
      },
      (error: any, result: any) => {
        if (error || !result) {
          reject(new ApiError("Image upload failed", 500));
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};
