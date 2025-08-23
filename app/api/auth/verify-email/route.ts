// app/api/auth/verify-email/route.ts
import { verifyEmailController } from "@/controllers/auth.controller";

export async function POST(req: Request) {
  return verifyEmailController(req);
}
