import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

import { Doc, Id } from "./_generated/dataModel";

// Doesn't work like this unfortunately
// import { auth } from "../src/auth";

export const archive = mutation({
  args: {
    id: v.id("documents"),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId;

    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Not authorized");
    }

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    return document;
  },
});

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
    author: v.string(),
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
      author: args.author,
      userId: args.userId,
      // userId: userId,
      isArchived: false,
      isShared: false,
    });

    return document;
  },
});

// for now this is fine
export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    isShared: v.optional(v.boolean()),
    storyData: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;

    const document = await ctx.db.patch(args.id, { ...rest });

    return document;
  },
});
