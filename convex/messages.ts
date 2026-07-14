import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all messages for a conversation
export const getMessages = query({
    args: {
        conversationId: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .filter((q) =>
                q.eq(q.field("conversationId"), args.conversationId)
            )
            .collect();
    },
});

// create a new message
export const createMessage = mutation({
    args: {
        conversationId: v.string(),
        userId: v.string(),
        role: v.union(
            v.literal("user"),
            v.literal("assistant"),
            v.literal("system")
        ),
        content: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert("messages", {
            conversationId: args.conversationId,
            userId: args.userId,
            role: args.role,
            content: args.content,
            createdAt: Date.now(),
        });
    },
});

// detele message
export const DeleteMessage = mutation({
    args: {
        messageId: v.id("messages"),
    },

    handler: async (ctx, args) => {
        await ctx.db.delete(args.messageId);
    },
});
