"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const SignUp = async (name: string, email: string, password: string) => {
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: "/home",
    },
  });
  return result;
};

export const SignIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/home",
    },
  });

  return result;
};

export const LogOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
  return result;
};
