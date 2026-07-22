"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const SignUp = async (name: string, email: string, password: string) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/",
      },
      headers: await headers()
    });
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to sign up" };
  }
};

export const SignIn = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/",
      },
      headers: await headers()
    });
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to sign in" };
  }
};

export const LogOut = async () => {
  try {
    const result = await auth.api.signOut({ headers: await headers() });
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to log out" };
  }
};
