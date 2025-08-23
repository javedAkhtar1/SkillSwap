import { signupController } from "@/controllers/auth.controller";

export async function POST(req: Request) {
  return signupController(req);
}
