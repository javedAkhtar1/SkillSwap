import express from "express";
import {
  credentialLoginController,
  signupController,
  verifyEmailController,
} from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/login", credentialLoginController);
authRouter.post("/signup", signupController);
authRouter.post("/verify-email", verifyEmailController);
