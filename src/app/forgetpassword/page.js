"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

/* =======================
   Validation Schema
======================= */
const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.msg);
      } else {
        alert(result.msg || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold text-center mb-2">
          Forgot your password?
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email and we&apos;ll send you a reset link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2
                ${errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
                }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-medium
              hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Sending link..." : "continue"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Back to login
          </Link>
        </p>

      </div>
    </div>
  );
}
