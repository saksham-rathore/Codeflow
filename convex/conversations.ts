import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all conversations for a user
export const getconversations = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("conversations")
            .filter((q) => q.eq(q.field("userId"), args.userId)
            )
            .collect();
    }
})

// create a new conversations
export const createconversations = mutation({
    args: {
        userId: v.string(),
        projectId: v.string(),  
        title: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert("conversations", {
            userId: args.userId,
            projectId: args.projectId,
            title: args.title,
            createdAt: Date.now(),
        });
    },
});

// Rename conversations
export const Renameconversations = mutation({
    args: {
        conversationId: v.id("conversations"),
        title: v.string(),
    },

    handler: async (ctx, args) => {
        await ctx.db.patch(args.conversationId, {
            title: args.title,
        });
    },
});


// Delete converastion 
export const Deleteconversation = mutation({
    args: {
        conversationId: v.id("conversations"),
    },

    handler: async (ctx, args) => {
        await ctx.db.delete(args.conversationId);
    },
});