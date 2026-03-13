import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
import Forgot from "@/models/Forgot";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const handler = async (request) => {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ msg: "Token and password are required" }, { status: 400 });
    }

    // Validate password strength
    if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return NextResponse.json({ msg: "Password must be at least 8 characters and contain at least one special character" }, { status: 400 });
    }

    // Find the forgot entry by token
    const forgotEntry = await Forgot.findOne({ token });
    if (!forgotEntry) {
      return NextResponse.json({ msg: "Invalid or expired token" }, { status: 400 });
    }

    // Check if token is expired
    if (forgotEntry.expiresAt < new Date()) {
      await Forgot.deleteOne({ _id: forgotEntry._id });
      return NextResponse.json({ msg: "Token has expired" }, { status: 400 });
    }

    // Find the user
    const user = await User.findOne({ email: forgotEntry.email });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the forgot entry
    await Forgot.deleteOne({ _id: forgotEntry._id });

    return NextResponse.json({ msg: "Password reset successfully" }, { status: 200 });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ msg: "Error resetting password", error: error.message }, { status: 500 });
  }
};

const getHandler = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ valid: false, msg: "Token is required" }, { status: 400 });
    }

    // Find the forgot entry by token
    const forgotEntry = await Forgot.findOne({ token });
    if (!forgotEntry) {
      return NextResponse.json({ valid: false, msg: "Invalid token" }, { status: 400 });
    }

    // Check if token is expired
    if (forgotEntry.expiresAt < new Date()) {
      await Forgot.deleteOne({ _id: forgotEntry._id });
      return NextResponse.json({ valid: false, msg: "Token has expired" }, { status: 400 });
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ valid: false, msg: "Error verifying token", error: error.message }, { status: 500 });
  }
};

export const GET = connectDb(getHandler);
export const POST = connectDb(handler);
