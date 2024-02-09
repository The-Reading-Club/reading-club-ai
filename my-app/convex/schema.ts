import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    isShared: v.boolean(),
  }).index("by_user", ["userId"]),
});
