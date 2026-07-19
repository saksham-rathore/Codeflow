import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyAuth } from "./auth";

export const getFiles = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project");
        }

        return await ctx.db
            .query("files")
            .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
            .collect();
    },
});

export const getFile = query({
    args: {
        id: v.id("files")
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const file = await ctx.db.get("files", args.id);

        if (!file) {
            throw new Error("File not found");
        }

        const project = await ctx.db.get("projects", file.projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project");
        }

        return file;
    }
})