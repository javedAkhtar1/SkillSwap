import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth";
import {
  createConversationController,
  getConversationController,
  getUserConversationsController,
} from "../controllers/conversation.controller";

export const conversationRouter = Router();

conversationRouter.post("/create", verifyAuth, createConversationController);
conversationRouter.get("/", verifyAuth, getConversationController);
conversationRouter.get("/user", verifyAuth, getUserConversationsController);