import { NextRequest } from "next/server";
import { createConversationController, getConversationController } from "../../../controllers/conversation.controller"
export async function POST(req: NextRequest) {
  return createConversationController(req);
}

export async function GET(req: NextRequest) {
  return getConversationController(req);
}
