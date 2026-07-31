import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { verifyAuth } from "./auth";

export const getFiles = query({
    args: {
        projectId: v.id("projects")
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.projectId);

        if (!project) {
            throw new Error("Project not found")
        };

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project");
        };

        return await ctx.db
            .query("files")
            .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
            .collect();
    }
});


export const getFile = query({
    args: {
        id: v.id("files")
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const file = await ctx.db.get("files", args.id);

        if (!file) {
            throw new Error("Project not found")
        };

        const project = await ctx.db.get("projects", file.projectId);

        if (!project) {
            throw new Error("Project not found");
        };

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project");
        };

        return file;
    }
});

/**
 * Builds the full path to a file by traversing up the parent chain.
*
* Input:  A file ID (e.g., the ID of "button.tsx")
* Output: Array of ancestors from root to file: [{ _id, name: "src" }, { _id, name: "components" }, { _id, name: "button.tsx" }]
*
* Used for: Breadcrumbs navigation (src > components > button.tsx)
*/


export const getFolderContents = query({
    args: {
        projectId: v.id("projects"),
        parentId: v.optional(v.id("files")),
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.projectId)

        if (!project) {
            throw new Error("Project not found")
        };

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project");
        };

        const files = await ctx.db
            .query("files")
            .withIndex("by_project_parent", (q) => q.eq
                ("projectId", args.projectId).eq("parentId", args.parentId)
            )
            .collect();
    },
});

export const getFilePath = query({
    args: {
        id: v.id("files")
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const file = await ctx.db.get("files", args.id);

        if (!file) {
            throw new Error("Project not found")
        };

        const project = await ctx.db.get("projects", file.projectId);

        if (!project) {
            throw new Error("Project not found");
        };

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project");
        };

        // more lines here 

        return file;
    }
});

export const create = mutation({
    args: {
        name: v.string(),
        projectId: v.id("projects"),
        parentId: v.optional(v.id("files")),
        content: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await verifyAuth(ctx);

        const project = await ctx.db.get("projects", args.projectId);

        if (!project) {
            throw new Error("Project not found")
        };

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project");
        }

        // check if file with same name already exists in this parent folder
        const files = await ctx.db
            .query("files")
            .withIndex("by_project_parent", (q) =>
                q
                    .eq("projectId", args.projectId)
                    .eq("parentId", args.parentId)
            )
            .collect();

        const existing = files.find(
            (files) => files.name === args.name && files.type === "file"
        );

        if (existing) throw new Error("File already exists");

        const now = Date.now();

        await ctx.db.insert("files", {
            projectId: args.projectId,
            name: args.name,
            parentId: args.parentId,
            content: args.content,
            type: "file",
            updatedAt: now,
        })

        await ctx.db.patch("projects", args.projectId, {
            updatedAt: now,
        });
    },
});