import { changePasswordController } from "@/controllers/user.controller";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return changePasswordController(req);
}


