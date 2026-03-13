"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Validation Schema
const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token (you might want to use localStorage or a context)
        localStorage.setItem("token", result.token);
        router.push("/"); // Redirect to home
      } else {
        setErrorMessage(result.msg);
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign in to your account
        </h2>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={`w-full rounded-md border px-3 py-2 text-black focus:outline-none focus:ring-2
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-md border px-3 py-2 text-black focus:outline-none focus:ring-2
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

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" />
              Remember me
            </label>
            <Link href="/forgetpassword" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
            Sign up
            </Link>

        </form>
        

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-3 sm:py-2 hover:bg-gray-50 min-h-[ 44px ]" >
            <FaGoogle className="text-red-500" />
            Google
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-3 sm:py-2 hover:bg-gray-50 min-h-[ 44px ]" >
            <FaGithub />
            GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Not a member?{" "}
          <a href="/register" className="text-indigo-600 font-medium hover:underline">
            Start a 14 day free trial
          </a>
        </p>

      </div>
    </div>
  );
}
