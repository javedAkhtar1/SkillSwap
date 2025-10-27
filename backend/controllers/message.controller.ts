import { Request, Response } from "express";
import { sendMessage, getMessages } from "../services/message.service";
import { errorResponse, successResponse } from "../lib/api-response";
import { isValidIdFormat } from "../helper/helper-functions";
import { ApiError } from "../lib/api-error";

// ✅ POST /messages/send
export async function sendMessageController(req: Request, res: Response) {
  try {
    const { conversationId, text } = req.body;
    const user = (req as any).user;
    const senderId = user?.id || user?.sub;

    if (!conversationId || !text) {
      return errorResponse(
        res,
        "Conversation ID and text are required",
        400
      );
    }

    if (!isValidIdFormat(conversationId)) {
      return errorResponse(res, "Invalid conversation ID", 400);
    }

    const message = await sendMessage({ conversationId, senderId, text });

    return successResponse(res, { message }, 201);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}

// ✅ GET /messages?chat=<conversationId>
export async function getMessagesController(req: Request, res: Response) {
  try {
    const conversationId = req.query.chat as string;

    if (!conversationId) {
      return errorResponse(res, "conversationId/chat is required", 400);
    }

    if (!isValidIdFormat(conversationId)) {
      return errorResponse(res, "Invalid conversation ID", 400);
    }

    const messages = await getMessages(conversationId);

    return successResponse(res, { messages }, 200);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}
