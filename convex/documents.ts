import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";


export const create = mutation({
  args: { title: v.optional(v.string()), initialContent: v.optional(v.string()), },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();



    if (!user) {
      throw new ConvexError("Unathorized")
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      initialContent: args.initialContent,

    })

  },
});

export const get = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()), },
  handler: async (ctx, { search, paginationOpts }) => {

    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unathorized")
    }

    if (search) {
      return await ctx.db.query("documents")
        .withSearchIndex("search_title", (q) => q.search("title", search).eq("ownerId", user.subject))
        .paginate(paginationOpts)
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id" , (q) => q.eq("ownerId" , user.subject))
      .paginate(paginationOpts);
  },
});

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unathorized")
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document fot found");
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) {
      throw new ConvexError("Unathorized");
    }

    return await ctx.db.delete(args.id)
  }
})


//  Update mutation 


export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unathorized")
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document fot found");
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) {
      throw new ConvexError("Unathorized");
    }

    return await ctx.db.patch(args.id, { title: args.title })
  }
})

