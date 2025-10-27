import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth"
import {
  sendMessageController,
  getMessagesController,
} from "../controllers/message.controller";

export const messageRouter = Router();

messageRouter.post("/send", verifyAuth, sendMessageController);
messageRouter.get("/", verifyAuth, getMessagesController);

