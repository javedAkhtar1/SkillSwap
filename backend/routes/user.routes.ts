import express from "express";
import {
  changePasswordController,
  completeProfileController,
  getProfileController,
} from "../controllers/user.controller";
import { uploadImageController } from "../controllers/image-upload.controller";
import { upload } from "../middlewares/upload";
import { verifyAuth } from "../middlewares/verifyAuth";

export const userRouter = express.Router();

userRouter.get("/profile", getProfileController);
userRouter.post("/change-password", verifyAuth, changePasswordController);
userRouter.post("/complete-profile", verifyAuth, completeProfileController);

// image router for user profile image upload
export const imageRouter = express.Router();
imageRouter.post("/upload", upload.single("file"), uploadImageController);
