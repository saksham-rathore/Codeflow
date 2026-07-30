
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { verifyAuth } from "./auth";


export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const projectId = await ctx.db.insert("projects", {
            name: args.name,
            ownerId: identity.subject,
            updatedAt: Date.now()
        })

        return projectId;
    },
});


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

        const project = await ctx.db.get("projects", args.id);

        if (!project) {
            throw new Error("project not found")
        }

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to update this project");
        }

        await ctx.db.patch("projects", args.id, {
            settings: args.settings,
            updatedAt: Date.now()
        });
    },
});


export const rename = mutation({
    args: {
        id: v.id("projects"),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.id);

        if (!project) {
            throw new Error("project not found")
        };

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to update this project");
        }

        await ctx.db.patch("projects", args.id, {
            name: args.name,
            updatedAt: Date.now(),
        });
    },
});

export const get = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        return await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
            .order("desc")
            .collect();
    },
});


export const getPartial = query({
    args: {
        limit: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        return await ctx.db
            .query("projects")
            .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
            .order("desc")
            .collect();
    },
});


export const getById = query({
    args: {
        id: v.id("projects")
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.id);

        if (!project) {
            throw new Error("Project not found")
        };

        if (project.ownerId !== identity.subject) {
            console.error(`Unauthorized access: project ownerId is "${project.ownerId}", but authenticated user is "${identity.subject}"`);
            throw new Error(`Unauthorized access to this project. Owner: ${project.ownerId}, Current User: ${identity.subject}`);
        };

        return project;
    },
});