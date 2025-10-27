import express from "express";
import {
  changePasswordController,
  completeProfileController,
  getProfileByUsernameController,
} from "../controllers/user.controller";
import { uploadImageController } from "../controllers/image-upload.controller";
import { upload } from "../middlewares/upload";
import { verifyAuth } from "../middlewares/verifyAuth";

export const userRouter = express.Router();

userRouter.get("/:username", getProfileByUsernameController);
userRouter.post("/change-password", changePasswordController);
userRouter.post("/complete-profile", completeProfileController);

// image router for user profile image upload
export const imageRouter = express.Router();
imageRouter.post("/upload", upload.single("file"), uploadImageController);
