import { Router } from "express";
import { authRouter } from "./auth.routes";
import { imageRouter, userRouter } from "./user.routes";
import { messageRouter } from "./message.routes"
import { conversationRouter } from "./conversation.routes";

const router = Router();

// Prefix all auth routes with /api/auth
router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api", imageRouter);
router.use("/api/message", messageRouter);
router.use("/api/conversation", conversationRouter);

export default router;
