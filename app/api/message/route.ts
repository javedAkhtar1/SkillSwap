import { NextRequest } from "next/server";
import { sendMessageController, getMessagesController } from "../../../controllers/message.controller"  


export async function POST(req: NextRequest) {
  return sendMessageController(req);
}

export async function GET(req: NextRequest) {
  return getMessagesController(req);
}
