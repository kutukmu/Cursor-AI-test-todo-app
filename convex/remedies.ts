import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all remedies
export const getRemedies = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("remedies")
      .withIndex("by_creation")
      .order("desc")
      .collect();
  },
});

// Query to get remedies by category
export const getRemediesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("remedies")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Query to get user's favorite remedies
export const getUserFavorites = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const favorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    // Get remedy details for each favorite
    const remedyIds = favorites.map(f => f.remedyId);
    const remedies = await Promise.all(
      remedyIds.map(id => ctx.db.get(id))
    );
    
    return remedies.filter(r => r !== null);
  },
});

// Check if a remedy is favorited by user
export const isFavorite = query({
  args: { 
    userId: v.string(),
    remedyId: v.id("remedies"),
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_and_remedy", (q) => 
        q.eq("userId", args.userId).eq("remedyId", args.remedyId)
      )
      .first();
    
    return favorite !== null;
  },
});

// Mutation to add a remedy to favorites
export const addToFavorites = mutation({
  args: {
    userId: v.string(),
    remedyId: v.id("remedies"),
  },
  handler: async (ctx, args) => {
    // Check if already favorited
    const existing = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_and_remedy", (q) => 
        q.eq("userId", args.userId).eq("remedyId", args.remedyId)
      )
      .first();
    
    if (existing) {
      return existing._id;
    }
    
    return await ctx.db.insert("userFavorites", {
      userId: args.userId,
      remedyId: args.remedyId,
      createdAt: Date.now(),
    });
  },
});

// Mutation to remove a remedy from favorites
export const removeFromFavorites = mutation({
  args: {
    userId: v.string(),
    remedyId: v.id("remedies"),
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_and_remedy", (q) => 
        q.eq("userId", args.userId).eq("remedyId", args.remedyId)
      )
      .first();
    
    if (favorite) {
      await ctx.db.delete(favorite._id);
    }
  },
});

// Mutation to create a new remedy (admin function)
export const createRemedy = mutation({
  args: {
    title: v.string(),
    steps: v.number(),
    duration: v.string(),
    category: v.string(),
    gradientStart: v.string(),
    gradientEnd: v.string(),
    description: v.optional(v.string()),
    ingredients: v.optional(v.array(v.string())),
    instructions: v.optional(v.array(v.string())),
    dailyTasks: v.optional(v.array(v.array(v.string()))),
    dailyInstructions: v.optional(v.array(v.array(v.string()))),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("remedies", {
      title: args.title,
      steps: args.steps,
      duration: args.duration,
      category: args.category,
      gradientStart: args.gradientStart,
      gradientEnd: args.gradientEnd,
      description: args.description,
      ingredients: args.ingredients,
      instructions: args.instructions,
      dailyTasks: args.dailyTasks,
      dailyInstructions: args.dailyInstructions,
      createdAt: Date.now(),
    });
  },
});

// Query to get user's challenge progress for a specific remedy
export const getUserChallengeProgress = query({
  args: {
    userId: v.string(),
    remedyId: v.id("remedies"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userChallenges")
      .withIndex("by_user_and_remedy", (q) =>
        q.eq("userId", args.userId).eq("remedyId", args.remedyId)
      )
      .first();
  },
});

// Mutation to join a challenge
export const joinChallenge = mutation({
  args: {
    userId: v.string(),
    remedyId: v.id("remedies"),
  },
  handler: async (ctx, args) => {
    // Check if already joined
    const existing = await ctx.db
      .query("userChallenges")
      .withIndex("by_user_and_remedy", (q) =>
        q.eq("userId", args.userId).eq("remedyId", args.remedyId)
      )
      .first();

    if (existing) {
      return existing._id;
    }

    return await ctx.db.insert("userChallenges", {
      userId: args.userId,
      remedyId: args.remedyId,
      currentDay: 1,
      completedDays: [],
      currentBatchCount: 0,
      currentBatchStartTime: undefined,
      joinedAt: Date.now(),
      lastActivityAt: Date.now(),
    });
  },
});

// Mutation to complete a day
export const completeDay = mutation({
  args: {
    userId: v.string(),
    remedyId: v.id("remedies"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    const challenge = await ctx.db
      .query("userChallenges")
      .withIndex("by_user_and_remedy", (q) =>
        q.eq("userId", args.userId).eq("remedyId", args.remedyId)
      )
      .first();

    if (!challenge) {
      throw new Error("Challenge not found");
    }

    // Check if day is already completed
    if (challenge.completedDays.includes(args.day)) {
      return challenge._id;
    }

    // Check if previous day is completed (can't skip days)
    if (args.day > 1 && !challenge.completedDays.includes(args.day - 1)) {
      throw new Error("Previous day must be completed first");
    }

    const now = Date.now();
    const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
    
    // Check batch completion limit: 2 challenges per 12 hours
    const batchCount = challenge.currentBatchCount || 0;
    const batchStartTime = challenge.currentBatchStartTime;
    
    // If user has completed 2 challenges in current batch
    if (batchCount >= 2 && batchStartTime) {
      const timeSinceBatchStart = now - batchStartTime;
      
      // If less than 12 hours have passed since batch started, block them
      if (timeSinceBatchStart < TWELVE_HOURS_MS) {
        const hoursRemaining = Math.ceil((TWELVE_HOURS_MS - timeSinceBatchStart) / (60 * 60 * 1000));
        throw new Error(`COOLDOWN_ACTIVE:${hoursRemaining}`);
      }
      
      // 12 hours have passed, reset the batch
      // This challenge will be the first of a new batch
    }

    // Determine new batch values
    let newBatchCount: number;
    let newBatchStartTime: number;
    
    if (batchCount >= 2 || !batchStartTime) {
      // Starting a new batch
      newBatchCount = 1;
      newBatchStartTime = now;
    } else {
      // Continuing current batch
      newBatchCount = batchCount + 1;
      newBatchStartTime = batchStartTime;
    }

    // Add day to completed days
    const newCompletedDays = [...challenge.completedDays, args.day].sort((a, b) => a - b);
    const newCurrentDay = args.day + 1;

    await ctx.db.patch(challenge._id, {
      completedDays: newCompletedDays,
      currentDay: newCurrentDay,
      currentBatchCount: newBatchCount,
      currentBatchStartTime: newBatchStartTime,
      lastActivityAt: now,
    });

    return challenge._id;
  },
});

