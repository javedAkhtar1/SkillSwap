import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth"
import { createConversationController, getConversationController } from "../controllers/conversation.controller";

export const conversationRouter = Router();

conversationRouter.post("/create", verifyAuth, createConversationController);
conversationRouter.get("/", verifyAuth, getConversationController);

