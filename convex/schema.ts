import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  visitors: defineTable({
    name: v.string(),
    startTime: v.number(),
    x: v.number(),
    y: v.number(),
  }),
});