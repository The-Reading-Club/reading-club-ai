import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

import { Doc, Id } from "./_generated/dataModel";

// Doesn't work like this unfortunately
// import { auth } from "../src/auth";

export const get = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId;

    if (!userId) {
      throw new Error("Not authenticated");
    }

    // query by email
    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(100);

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("Not authenticated");
    // }

    // const userId = identity.subject;

    // const session = await auth;

    // const session = await auth();
    // const userId = session?.user.id;

    // if (!userId) {
    //   throw new Error("Not authenticated");
    // }

    const document = await ctx.db.insert("documents", {
      title: args.title,
      userId: args.userId,
      // userId: userId,
      isArchived: false,
      isShared: false,
    });

    return document;
  },
});
