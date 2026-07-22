"use client";
import { error } from "console";
import React, { useState } from "react";

export default function SignUpPage() {
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
        <form className="space-y-4">

          <div className="bg-red-950/50 border border-red-900 text-red-200 rounded-lg p-3 text-sm text-center">

          </div>


          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Full Name
            </label>
            <input
              type="text"



              placeholder="John Doe"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>
            <input
              type="email"

              placeholder="john@example.com"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>
            <input
              type="password"

              placeholder="••••••••"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Confirm Password
            </label>
            <input

              type="password"

              placeholder="••••••••"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-white transition disabled:opacity-50"
            />
          </div>

          <button
            type="submit"

            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
          >

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