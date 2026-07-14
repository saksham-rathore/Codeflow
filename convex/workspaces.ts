import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getWorkspace = query({
    args: {
        userId: v.string(),
        projectId: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db
            .query("workspaces")
            .filter((q) =>
                q.eq(q.field("userId"), args.userId)
            )
            .first();
    },
});

export const updateWorkspace = mutation({
    args: {
        workspaceId: v.id("workspaces"),
        activeFile: v.string(),
        cursorLine: v.number(),
        cursorColumn: v.number(),
    },

    handler: async (ctx, args) => {
        await ctx.db.patch(args.workspaceId, {
            activeFile: args.activeFile,
            cursorline: args.cursorLine,
            cursorcolumn: args.cursorColumn,
        });
    },
});