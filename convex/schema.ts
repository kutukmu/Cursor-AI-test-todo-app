import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
    userId: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_creation", ["userId", "createdAt"]),
});

