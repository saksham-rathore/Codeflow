import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// getfiles
export const getfiles = query({
    args: {
        projectId: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db
            .query("files")
            .filter((q) =>
                q.eq(q.field("projectId"), args.projectId)
            )
            .collect();
    },
});


// save files
export const savefile = mutation({
    args: {
        projectId: v.string(),
        path: v.string(),
        content: v.string(),
        language: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert("files", {
            ...args,
            updatedAt: Date.now(),
        });
    },
});