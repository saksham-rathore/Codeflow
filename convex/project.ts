import { Query } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getProject = query({
    args: {
        userId: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db
            .query("project")
            .filter((q) =>
                q.eq(q.field("userId"), args.userId)
            )
            .collect();
    },
});


export const createproject = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("project", {
            ...args,
            createdAt: Date.now(),
        });
    },
});