import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ success: true, message: "Connected to DB" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
