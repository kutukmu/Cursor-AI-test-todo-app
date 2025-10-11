import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
    userId: v.string(),
    // Hair-specific fields
    category: v.optional(v.union(
      v.literal("wash"),
      v.literal("condition"),
      v.literal("treatment"),
      v.literal("styling"),
      v.literal("protection"),
      v.literal("other")
    )),
    productName: v.optional(v.string()),
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_creation", ["userId", "createdAt"])
    .index("by_user_and_category", ["userId", "category"]),
});

