// routes/friends.routes.ts
import { Router } from "express";
import FriendsController from "../controllers/friends.controller";
import { verifyAuth } from "../middlewares/verifyAuth";

export const friendsRouter = Router();

friendsRouter.post("/send", verifyAuth, FriendsController.sendRequest);
friendsRouter.post("/accept", verifyAuth, FriendsController.acceptRequest);
friendsRouter.post("/reject", verifyAuth, FriendsController.rejectRequest);
friendsRouter.post("/cancel", verifyAuth, FriendsController.cancelRequest);

friendsRouter.get("/pending/received", verifyAuth, FriendsController.getPendingReceived);
friendsRouter.get("/pending/sent", verifyAuth, FriendsController.getPendingSent);

friendsRouter.post("/unfriend", verifyAuth, FriendsController.unfriend);

