import { getProfileByUsernameController } from "@/controllers/user.controller";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ username: string }> } // Note: params is Promise
) {
  const { params } = context;
  const resolvedParams = await params;
  return getProfileByUsernameController(req, { params: resolvedParams });
}
