import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export default defineSchema({
    projects: defineTable({
        name: v.string(),
        ownerId: v.string(),
        updatedAt: v.number(),
        importstatus: v.optional(
            v.union(
                v.literal("importing"),
                v.literal("completed"),
                v.literal("failed"),
            ),
        ),
        exportstatus: v.optional(
            v.union(
                v.literal("exporting"),
                v.literal("completed"),
                v.literal("failed"),
                v.literal("cancelled"),
            ),
        ),
        exportRepoUrl: v.optional(v.string()),
        settings: v.optional(
            v.object({
                installCommand: v.optional(v.string()),
                devCommand: v.optional(v.string()),
            })
        ),
    }).index("by_owner", ["ownerId"])
});