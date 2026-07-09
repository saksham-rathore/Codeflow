"use server";

import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"

// const formData = await req.formData();

export default async function registerEmail(formdata: FormData) {
    const name = formdata.get("name") as string
    const email = formdata.get("email") as string
    const password = formdata.get("password") as string
    const confirmpassword = formdata.get("confirm-password") as string

    await auth.api.signUpEmail({
        body: {
            name,
            email, 
            password,
        },
        headers: await headers(),
    });
}