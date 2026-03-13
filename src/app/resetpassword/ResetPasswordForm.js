"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/* =======================
   Validation Schema
======================= */
const resetSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isValidToken, setIsValidToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
    } else {
      // Verify the token by calling the API
      const verifyToken = async () => {
        try {
          const response = await fetch(`/api/resetpassword?token=${token}`);
          const result = await response.json();
          setIsValidToken(result.valid);
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsValidToken(false);
        }
      };
      verifyToken();
    }
  }, [token]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password: data.password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.msg);
        // Redirect to login page
        window.location.href = "/login";
      } else {
        alert(result.msg || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while resetting the password");
    }
  };

  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Invalid or Expired Link</h2>
          <p className="text-gray-600">The password reset link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Reset your password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter new password"
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2
                ${errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
                }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm new password"
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2
                ${errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-medium
              hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
