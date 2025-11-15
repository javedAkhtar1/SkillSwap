import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { ApiError } from "../lib/api-error";

export const verifyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | null = null;
 
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(token, "TOKEN")

    if (!token) throw new ApiError("Unauthorized", 401);

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);

    if (!decoded || typeof decoded === "string")
      throw new ApiError("Invalid token", 401);

    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    throw new ApiError("Forbidden", 403);
  }
};
