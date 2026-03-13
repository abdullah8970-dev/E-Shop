import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";

const handler = async (request) => {
  try {
    const users = await User.find({});
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ msg: "Error fetching users", error: error.message }, { status: 500 });
  }
};

export const GET = connectDb(handler);
