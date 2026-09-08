import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createVisitor = mutation({
  args: {
    name: v.string(),
    startTime: v.number(),
    x: v.number(),
    y: v.number(),
  },

  handler: async (ctx, args) => {
    const visitor = await ctx.db.insert("visitors", {
      name: args.name,
      startTime: args.startTime,
      x: args.x,
      y: args.y,
    });

    return visitor;
  },
});