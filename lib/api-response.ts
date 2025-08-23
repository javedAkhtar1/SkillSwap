import { NextResponse } from "next/server";

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    { success: true, data },
    { status }
  );
}

export function errorResponse<T>(message: T, status: number = 500) {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  );
}
