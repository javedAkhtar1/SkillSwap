import { Request, Response } from "express";
import FriendsService from "../services/friends.service";
import { ApiError } from "../lib/api-error";
import { errorResponse, successResponse } from "../lib/api-response";

export default class FriendsController {
  static async sendRequest(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const from = user.id;
      const { to } = req.body;
      const request = await FriendsService.sendRequest(from, to);
      return successResponse(res, { message: "Friend request sent", request }, 201);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(res, error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse(res, "Something went wrong", 500);
    }
  }

  static async acceptRequest(req: Request, res: Response) {
    try {
      const { requestId } = req.body;
      const result = await FriendsService.acceptRequest(requestId);
      return successResponse(res, { message: "Friend request accepted", request: result }, 200);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(res, error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse(res, "Something went wrong", 500);
    }
  }

  static async rejectRequest(req: Request, res: Response) {
    try {
      const { requestId } = req.body;
      const result = await FriendsService.rejectRequest(requestId);
      return successResponse(res, { message: "Friend request rejected", request: result }, 200);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(res, error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse(res, "Something went wrong", 500);
    }
  }

  static async cancelRequest(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const from = user.id;
      const { to } = req.body;
      const result = await FriendsService.cancelRequest(from, to);
      return successResponse(res, { message: "Friend request cancelled", deleted: result }, 200);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(res, error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse(res, "Something went wrong", 500);
    }
  }

  static async getPendingReceived(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const userId = user.id;
      const requests = await FriendsService.getPendingReceived(userId);
      return successResponse(res, { message: "Pending friend requests received", requests }, 200);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(res, error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse(res, "Something went wrong", 500);
    }
  }

  static async getPendingSent(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const userId = user.id;
      const requests = await FriendsService.getPendingSent(userId);
      return successResponse(res, { message: "Pending friend requests sent", requests }, 200);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(res, error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse(res, "Something went wrong", 500);
    }
  }

  static async unfriend(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const userId = user.id;
      const { friendId } = req.body;
      const result = await FriendsService.unfriend(userId, friendId);
      return successResponse(res, { message: "Friend removed", result }, 200);
    } catch (error: any) {
      if (error instanceof ApiError) {
        return errorResponse(res, error.message, error.status);
      }
      console.error("Unexpected error:", error);
      return errorResponse(res, "Something went wrong", 500);
    }
  }
}
