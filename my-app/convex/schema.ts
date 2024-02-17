import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    // make author required later
    author: v.optional(v.string()),
    // for legacy compatibility
    userId: v.string(), // this will be actually the email
    // has to be optional for backward compatibility
    userOauthId: v.optional(v.string()),
    isArchived: v.boolean(),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    isShared: v.boolean(),
    storyData: v.optional(v.string()),
  }).index("by_user", ["userId"]),
});
