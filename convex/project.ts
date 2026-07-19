import { Query } from "convex/server";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "@/lib/auth";

export const updateSettings = internalMutation({
    args: {
        id: v.id("projects"),
        settings: v.object({
            installCommand: v.optional(v.string()),
            devCommand: v.optional(v.string()),
        })
    },
    handler: async (ctx, args) => {
        // User verify only 

        const project = await ctx.db.get("projects", args.id)

        if (!project) {
            throw new Error("Project not found");
        }

        await ctx.db.patch("projects", args.id, {
            settings: args.settings,
            updatedAt: Date.now(),
        });
    },
});

export const create = internalMutation({
    args: {
        name: v.string(),
        ownerId: v.string(),
    },
    handler: async (ctx, args) => {

        const projectId = await ctx.db.insert("projects", {
            name: args.name,
            updatedAt: Date.now(),
            ownerId: args.ownerId,
        });

        return projectId;
    },
});