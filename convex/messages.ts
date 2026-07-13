import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all messages for a conversation
export const getMessages = query({
    args: {
        conversationId: v.string(),
    },
    handler: async (ctx, args) => {
        return await
        
    },
});