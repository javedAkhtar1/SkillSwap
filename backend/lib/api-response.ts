import { Response } from "express";

export function errorResponse<T>(res: Response, message: T, status: number = 500) {
  return res.status(status).json({
    success: false,
    error: message,
  });
}

export function successResponse<T>(res: Response, data: T, status: number = 200) {
  return res.status(status).json({
    success: true,
    data,
  });
}
