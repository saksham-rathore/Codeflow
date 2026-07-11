"use client";
import React, { useState } from "react";
import { SignUp } from "@/actions/(auth)/auth-actions";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // <input value={name} onChange={(e) => setName(e.target.value)} />;

  // <input value={email} onChange={(e) => setEmail(e.target.value)} />;

  // <input
  //   type="password"
  //   value={password}
  //   onChange={(e) => setPassword(e.target.value)}
  // />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await SignUp(name, email, password);
    console.log(result);
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-zinc-400 mt-2">Join us and get started today</p>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-zinc-700 text-white py-3 rounded-lg hover:bg-zinc-900 transition"
          >
            Continue with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-zinc-700 text-white py-3 rounded-lg hover:bg-zinc-900 transition"
          >
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="px-4 text-zinc-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Confirm Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-400 text-sm mt-6">
          Already have an account?
          <a href="/sign-in" className="text-white ml-1 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
