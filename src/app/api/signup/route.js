import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
import LoginLog from "@/models/LoginLog";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const handler = async (request) => {
  try {
    const { name, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ msg: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Log signup
    const logEntry = await LoginLog.create({
      userId: user._id,
      email: user.email,
      ip: request.headers.get("x-forwarded-for") || request.ip,
    });

    return NextResponse.json({ msg: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ msg: "Error creating user", error: error.message }, { status: 500 });
  }
};

export const POST = connectDb(handler);
