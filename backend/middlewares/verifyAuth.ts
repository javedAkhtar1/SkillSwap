import { Request, Response, NextFunction } from "express";
import { getToken } from "next-auth/jwt";
import { ApiError } from "../lib/api-error";
import cookie from "cookie";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: any = null;
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token && req.headers.cookie) {
      const parsedCookies = cookie.parse(req.headers.cookie);
      const sessionToken =
        parsedCookies["next-auth.session-token"] ||
        parsedCookies["__Secure-next-auth.session-token"];

      if (sessionToken) {
        token = await getToken({
          req: {
            headers: {
              cookie: `next-auth.session-token=${sessionToken}`,
            },
          } as any,
          secret: process.env.NEXTAUTH_SECRET,
        });
      }
    }

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      const authToken = req.headers.authorization.split(" ")[1];
      token = await getToken({
        req: {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        } as any,
        secret: process.env.NEXTAUTH_SECRET,
      });
    }

    if (!token || !token.email) {
      throw new ApiError("Unauthorized", 401);
    }

    (req as any).user = token;
    next();
  } catch (err) {
    console.log("Auth Error:", err);
    throw new ApiError("Forbidden", 403);
  }
};
