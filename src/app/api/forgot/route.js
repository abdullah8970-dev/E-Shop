import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
import Forgot from "@/models/Forgot";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { NextResponse } from "next/server";

const handler = async (request) => {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json({ msg: "Invalid JSON in request body" }, { status: 400 });
    }

    const { email } = body;

    if (!email) {
      return NextResponse.json({ msg: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user) {
      return NextResponse.json({ msg: "No account found with this email." }, { status: 404 });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");

    // Set expiration to 1 hour from now
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Save token in database
    const forgotEntry = new Forgot({
      email,
      token,
      expiresAt,
    });
    await forgotEntry.save();

    // Use default base URL if not set
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Set up nodemailer transporter
    const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
    const isGmail = process.env.SMTP_HOST?.toLowerCase().includes('gmail');

    // For Gmail, try port 465 (SSL) if 587 fails
    const gmailPort = smtpPort === 587 ? 465 : smtpPort;
    const gmailSecure = gmailPort === 465;

    const transporter = nodemailer.createTransport({
      service: isGmail ? 'gmail' : undefined,
      host: isGmail ? undefined : process.env.SMTP_HOST,
      port: isGmail ? gmailPort : smtpPort,
      secure: isGmail ? gmailSecure : (smtpPort === 465), // true for 465 (SSL), false for 587 (TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      // Add connection timeout and retry settings
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });

    // Construct reset link
    const resetLink = `${baseUrl}/resetpassword?token=${token}`;

    // Email options
    const mailOptions = {
      from: `"Your App" <${process.env.SMTP_USER}>`, // Format as "Name <email>"
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    // Send email
    try {
      // Check if all SMTP environment variables are set
      const smtpVars = [process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USER, process.env.SMTP_PASS];
      const allSmtpSet = smtpVars.every(envVar => envVar && envVar.trim() !== '');

      if (!allSmtpSet) {
        // For development: log the reset link instead of sending email
        console.log("Password reset link (development mode - missing SMTP config):", resetLink);
        return NextResponse.json({ msg: "Password reset link has been sent to your email." }, { status: 200 });
      }

      console.log("Attempting to send email with config:", {
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpPort === 465,
        user: process.env.SMTP_USER ? "set" : "not set",
        pass: process.env.SMTP_PASS ? "set" : "not set"
      });

      const result = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", result);
      console.log("Password reset email sent to:", email);
      return NextResponse.json({ msg: "Password reset link has been sent to your email." }, { status: 200 });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      console.error("SMTP Config - Host:", process.env.SMTP_HOST, "Port:", process.env.SMTP_PORT, "User:", process.env.SMTP_USER ? "set" : "not set");

      // Provide more specific error messages
      let errorMsg = "Error sending reset email";
      if (emailError.code === 'EAUTH') {
        errorMsg = "Authentication failed. Please check your SMTP credentials.";
      } else if (emailError.code === 'ECONNREFUSED') {
        errorMsg = "Connection refused. Please check your SMTP host and port.";
      } else if (emailError.code === 'ENOTFOUND') {
        errorMsg = "SMTP host not found. Please check your SMTP_HOST.";
      }

      return NextResponse.json({ msg: errorMsg, error: emailError.message }, { status: 500 });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ msg: "Error sending reset email", error: error.message }, { status: 500 });
  }
};

export const POST = connectDb(handler);
