import connectDb from "@/middleware/mongoose";
import LoginLog from "@/models/LoginLog";
import { NextResponse } from "next/server";

const handler = async (request) => {
  try {
    const logs = await LoginLog.find({}).populate("userId", "name email").sort({ loginTime: -1 });
    return NextResponse.json({ logs });
  } catch (error) {
    return NextResponse.json({ msg: "Error fetching logs", error: error.message }, { status: 500 });
  }
};

export const GET = connectDb(handler);
