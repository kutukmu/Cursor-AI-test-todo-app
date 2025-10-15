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
  
  remedies: defineTable({
    title: v.string(),
    steps: v.number(),
    duration: v.string(),
    category: v.string(), // e.g., "growth", "moisture", "protection", "styling"
    gradientStart: v.string(),
    gradientEnd: v.string(),
    description: v.optional(v.string()),
    ingredients: v.optional(v.array(v.string())),
    instructions: v.optional(v.array(v.string())),
    dailyTasks: v.optional(v.array(v.array(v.string()))), // Array of arrays - one array of tasks per day
    dailyInstructions: v.optional(v.array(v.array(v.string()))), // Array of arrays - detailed instructions for each task per day
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_creation", ["createdAt"]),
  
  userFavorites: defineTable({
    userId: v.string(),
    remedyId: v.id("remedies"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_remedy", ["remedyId"])
    .index("by_user_and_remedy", ["userId", "remedyId"]),
  
  userChallenges: defineTable({
    userId: v.string(),
    remedyId: v.id("remedies"),
    currentDay: v.number(), // Current day the user is on (1-based)
    completedDays: v.array(v.number()), // Array of completed day numbers
    lastCompletedDayDate: v.optional(v.string()), // Date when last day was completed (YYYY-MM-DD format)
    currentBatchCount: v.optional(v.number()), // Number of challenges completed in current batch (max 2)
    currentBatchStartTime: v.optional(v.number()), // Timestamp when current batch started
    joinedAt: v.number(),
    lastActivityAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_remedy", ["remedyId"])
    .index("by_user_and_remedy", ["userId", "remedyId"]),
});

