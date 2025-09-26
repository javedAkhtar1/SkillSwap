import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
    createConversation,
    getConversation,
} from "@/services/conversation.service";
import { isValidIdFormat } from "@/helper/helper-functions";

export async function createConversationController(req: Request) {
  try {
    const { senderId, receiverId } = await req.json();

    if (!senderId || !receiverId) {
      return errorResponse("Sender ID and receiver ID are required", 400);
    }
    if (
      !isValidIdFormat(senderId) ||
      !isValidIdFormat(receiverId)
    ) {
      return errorResponse("Invalid ID format", 400);
    }
    const result = await createConversation(senderId, receiverId);
    return successResponse({ result }, 201);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

export async function getConversationController(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const senderId = searchParams.get("sender");
    const receiverId = searchParams.get("receiver");

    if (!senderId || !receiverId) {
      return errorResponse("Sender ID and receiver ID are required", 400);
    }
    const result = await getConversation(senderId, receiverId);
    return successResponse({ result }, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse("Something went wrong", 500);
  }
}
