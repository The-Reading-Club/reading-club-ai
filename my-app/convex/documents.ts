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

export const getShared = query({
  args: {
    userOauthId: v.string(),
  },
  handler: async (ctx, args) => {
    // Now get shared will be an authenticated api request

    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    if (identity.subject !== args.userOauthId) {
      throw new Error("Not authorized");
    }

    // could check hostname to see if it's the server or the client and show non-shared during development

    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("userOauthId"), args.userOauthId))
      .filter((q) => q.eq(q.field("isShared"), true))
      .order("desc")
      .take(100);

    return documents;
  },
});

export const getPublished = query({
  args: {
    userOauthId: v.string(),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("userOauthId"), args.userOauthId))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .take(100);

    return documents;
  },
});

export const getFollowed = query({
  args: {
    userOauthIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .take(1000);

    // let's just return all published documents whatever
    return documents;

    return documents.filter((d) => {
      if (!d.userOauthId) {
        return false;
      }
      const isFollowed = args.userOauthIds.includes(d.userOauthId);

      return isFollowed;
    });
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log("CONVEX identity", identity);

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userOauthId = identity.subject;

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
      userOauthId: userOauthId,
      isArchived: false,
      isShared: false,
      isPublished: false,
    });

    return document;
  },
});

// for now this is fine
export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    // https://github.com/AntonioErdeljac/notion-clone-tutorial/blob/598542b5b3a63a11d7873683642028f03b170f60/convex/documents.ts#L244
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    if (document.isShared && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.email; // old compatibility because we used to think of the email as the userId in convex

    if (document.userId !== userId) {
      throw new Error("Not authorized");
    }

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
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // https://github.com/AntonioErdeljac/notion-clone-tutorial/blob/master/convex/documents.ts
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userOauthId = identity.subject;
    const userId = identity.email;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Not authorized");
    }

    // #region image cover

    const { content } = rest;

    // only do it if there's no cover image already set
    try {
      if (content && !rest.coverImage) {
        console.log("Finding cover image");
        const tiptapDoc = JSON.parse(content);

        if (tiptapDoc["type"] == "doc") {
          // find the first image
          const firstImage = tiptapDoc.content.find(
            (node: any) => node.type == "image"
          );

          // set as cover image
          rest.coverImage = firstImage.attrs.src;
          console.log("Cover image found", rest.coverImage);
        }
      }
    } catch (error) {
      console.error("Error finding cover image", error);
    }

    // #endregion

    const document = await ctx.db.patch(args.id, {
      ...rest,
      // old documents didn't have this field at creation,
      // we we're adding it here
      // probably should check first if it's missing in the exisitng doc, but for now it's fine to overwrite it
      userOauthId,
    });

    return document;
  },
});

// Count and order by documents created to find most active users
export const getMostActiveUsers = query({
  args: {},
  handler: async (ctx, args) => {
    const documents = await ctx.db.query("documents").order("desc").take(1000);

    const users = documents.reduce((acc: any, document: Doc<"documents">) => {
      if (!document.userId) {
        return acc;
      }

      if (!acc[document.userId]) {
        acc[document.userId] = 0;
      }

      acc[document.userId]++;

      return acc;
    }, {});

    const sortedUsers = Object.keys(users).sort((a, b) => users[b] - users[a]);

    return sortedUsers;
  },
});
