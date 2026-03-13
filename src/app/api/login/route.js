import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
import LoginLog from "@/models/LoginLog";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const handler = async (request) => {
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user) {
      return NextResponse.json(
        { msg: "You do not have an account. Please sign up first before signing in." },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ msg: "Wrong password" }, { status: 400 });
    }

    // Log login
    try {
      const logEntry = await LoginLog.create({
        userId: user._id,
        email: user.email,
        ip: request.headers.get("x-forwarded-for") || request.ip,
      });
      console.log("Login log created:", logEntry);
    } catch (logError) {
      console.error("Error creating login log:", logError);
    }

    const token = jwt.sign({ id: user._id }, "SECRET", { expiresIn: "1d" });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Error during login", error: error.message }, { status: 500 });
  }
};

export const POST = connectDb(handler);
