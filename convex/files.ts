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

/**
 * Builds the full path to a file by traversing up the parent chain.
 *
 * Input:  A file ID (e.g., the ID of "button.tsx")
 * Output: Array of ancestors from root to file: [{ _id, name: "src" }, { _id, name: "components" }, { _id, name: "button.tsx" }]
 *
 * Used for: Breadcrumbs navigation (src > components > button.tsx)
 */

export const getFilePath = query({
    args: {
        id: v.id("files"),
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

        // here code is missing
    },
});

// export const getFilePath = query({
//     args: {

//     },
//     handler: async (ctx, args) => {

//     },
// });

// export const getFilePath = query({
//     args: {

//     },
//     handler: async (ctx, args) => {

//     },
// });

// export const getFilePath = query({
//     args: {

//     },
//     handler: async (ctx, args) => {

//     },
// });