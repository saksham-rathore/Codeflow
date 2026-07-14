// import { role } from "better-auth/client";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversations: defineTable({
    userId: v.string(),
    projectId: v.string(),
    title: v.string(),
    createdAt: v.number(),
  }),

  files: defineTable({
    projectId: v.string(),
    path: v.string(),
    content: v.string(),
    language: v.string(),
    updatedAt: v.number(),
  }),

  project: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    createdAt: v.number(),
  }),

  workspaces: defineTable({
    userId: v.string(),
    projectId: v.string(),
    activeFile: v.string(),
    sidebarcollapsed: v.boolean(),
    cursorline: v.number(),
    cursorcolumn: v.number(),
  }),

  messages: defineTable({
    conversationId: v.string(),
    userId: v.string(),
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system")
    ),
    content: v.string(),
    createdAt: v.number(),
  }),
})