"use client";
import { SignIn } from "@/actions/(auth)/auth-actions";
import React from "react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await SignIn(email, password);
    console.log(result);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">Sign in to your account</p>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 border border-zinc-700 hover:bg-zinc-900 text-white py-3 rounded-lg transition">
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-3 border border-zinc-700 hover:bg-zinc-900 text-white py-3 rounded-lg transition">
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-zinc-800"></div>
          <span className="px-4 text-zinc-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-800"></div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-zinc-300 block mb-2">Email</label>

            <input
              value={email}
              type="email"
              placeholder="john@example.com"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 block mb-2">Password</label>

            <input
              value={password}
              type="password"
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-400 text-sm mt-6">
          Dont have an account?
          <a href="/sign-up" className="text-white ml-1 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
