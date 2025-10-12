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
  
  profiles: defineTable({
    userId: v.string(),
    name: v.optional(v.string()),
    age: v.optional(v.number()),
    hairType: v.optional(v.union(
      v.literal("straight"),
      v.literal("wavy"),
      v.literal("curly"),
      v.literal("coily"),
      v.literal("mixed")
    )),
    hairConcerns: v.optional(v.array(v.string())), // e.g., ["dryness", "frizz", "breakage"]
    hairGoals: v.optional(v.array(v.string())), // e.g., ["growth", "moisture", "definition"]
    porosity: v.optional(v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    )),
    thickness: v.optional(v.union(
      v.literal("fine"),
      v.literal("medium"),
      v.literal("thick")
    )),
    length: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]),
});

