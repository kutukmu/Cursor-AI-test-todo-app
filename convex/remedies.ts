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
      createdAt: Date.now(),
    });
  },
});

