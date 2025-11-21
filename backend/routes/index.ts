import { Router } from "express";
import { authRouter } from "./auth.routes";
import { imageRouter, userRouter } from "./user.routes";
import { messageRouter } from "./message.routes"
import { conversationRouter } from "./conversation.routes";
import { friendsRouter } from "./friends.routes";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api", imageRouter);
router.use("/api/message", messageRouter);
router.use("/api/conversation", conversationRouter);
router.use("/api/friend-request", friendsRouter);

export default router;
