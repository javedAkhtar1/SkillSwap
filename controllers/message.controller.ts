import { sendMessage, getMessages } from "@/services/message.service";
import { errorResponse, successResponse } from "@/lib/api-response";
import { isValidIdFormat } from "@/helper/helper-functions";
import { ApiError } from "@/lib/api-error";

export async function sendMessageController(req: Request) {
  try {
    const { conversationId, senderId, text } = await req.json();
    if (!conversationId || !senderId || !text) {
      return errorResponse("Conversation ID, Sender ID and text are required", 400)
    }

    if (!isValidIdFormat(conversationId) || !isValidIdFormat(senderId)) {
      return errorResponse("Invalid conversation or sender ID", 400);
    }

    const message = await sendMessage(conversationId, senderId, text);
    return successResponse({ message }, 201);
  } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse("Something went wrong", 500);
    }
}

export async function getMessagesController(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("chat");
    if (!conversationId)
      return errorResponse("conversationId/chat is required", 400);

    const messages = await getMessages(conversationId);
    return successResponse({ messages }, 200);
  } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse("Something went wrong", 500);
    }
}
