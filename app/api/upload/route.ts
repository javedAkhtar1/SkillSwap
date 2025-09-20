import { uploadImageController } from "@/controllers/image-upload.controller";

export async function POST(req: Request) {
  return uploadImageController(req);
}
