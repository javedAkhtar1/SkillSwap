import { completeProfileController } from "@/controllers/user.controller";

export async function POST(req: Request) {
    return completeProfileController(req);
}