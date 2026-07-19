// actions/project-actions.ts
"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { internal } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function createProjectAction(projectName: string) {
    // 1. Identify the user using Better Auth
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        throw new Error("You must be logged in to create a project.");
    }

    // Here is where the `ownerId` comes from! 
    // We grab it from the verified Better Auth session and pass it to Convex.
    const projectId = await convex.mutation(internal.project.create, {
        name: projectName,
        ownerId: session.user.id, // <-- This is who the ownerId is!
    });

    return { projectId };
}