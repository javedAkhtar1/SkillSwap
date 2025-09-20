import { ApiError } from "@/lib/api-error";
import cloudinary from "@/lib/cloudinary";

export const uploadImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "skillswap/profiles",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          return reject(new ApiError("Image upload failed", 500));
        }
        resolve(result.secure_url); // only return the cloudinary url
      }
    );

    uploadStream.end(buffer);
  });
};
