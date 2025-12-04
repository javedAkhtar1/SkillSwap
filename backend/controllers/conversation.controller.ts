import { ApiError } from "../lib/api-error";
import { errorResponse, successResponse } from "../lib/api-response";
import {
  createConversation,
  getConversation,
  getUserConversations,
} from "../services/conversation.service";
import { isValidIdFormat } from "../helper/helper-functions";
import { Request, Response } from "express";

// POST /api/conversations/create
export const createConversationController = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const senderId = user?.id || user?.sub;
    const { receiverId } = req.body;

    if (!senderId || !receiverId) {
      return errorResponse(res, "Sender ID and receiver ID are required", 400);
    }

    if (!isValidIdFormat(senderId) || !isValidIdFormat(receiverId)) {
      return errorResponse(res, "Invalid ID format", 400);
    }

    const result = await createConversation(senderId, receiverId);
    return successResponse(res, { result }, 201);

  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

// GET /api/conversations?receiver=receiverId
export const getConversationController = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const senderId = user?.id || user?.sub;
    const receiverId = req.query.receiver as string;

    if (!senderId || !receiverId) {
      return errorResponse(res, "Sender ID and receiver ID are required", 400);
    }

    const result = await getConversation(senderId, receiverId);
    return successResponse(res, { result }, 200);

  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
};

export async function getUserConversationsController(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const userId = user.id
    const data = await getUserConversations(userId);
    return successResponse(res, data);
  } catch (error: any) {
    if (error instanceof ApiError) {
      return errorResponse(res, error.message, error.status);
    }
    console.error("Unexpected error:", error);
    return errorResponse(res, "Something went wrong", 500);
  }
}