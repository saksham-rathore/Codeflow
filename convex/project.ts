import { Query } from "convex/server";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "@/lib/auth";
import { verifyAuth } from "./auth";

export const updateSettings = mutation({
    args: {
        id: v.id("projects"),
        settings: v.object({
            installCommand: v.optional(v.string()),
            devCommand: v.optional(v.string()),
        })
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.id)

        if (!project) {
            throw new Error("Project not found");
        }

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to update this project");
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
        const identity = await verifyAuth(ctx);


        const projectId = await ctx.db.insert("projects", {
            name: args.name,
            updatedAt: Date.now(),
            ownerId: args.ownerId,
        });
        return projectId;
    },
});


export const getPartial = query({
    args: {
        limit: v.number(),
        ownerId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        return await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
            .order("desc")
            .take(args.limit);
    },
});

export const get = query({
    args: {
        ownerId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        return await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
            .order("desc")
            .collect();
    },
});

export const getById = query({
    args: {
        id: v.id("projects"),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.id);

        if (!project) {
            throw new Error("Project not found");
        }

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized access to this project")
        }

        return project;
    },
});

export const rename = mutation({
    args: {
        name: v.string(),
        id: v.id("projects"),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.id);

        if (!project) {
            throw new Error("Project not found");
        }

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized access to this project");
        }

        await ctx.db.patch("projects", args.id, {
            name: args.name,
            updatedAt: Date.now(),
        });
    },
});