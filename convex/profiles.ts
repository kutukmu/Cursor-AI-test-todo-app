import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get user profile
export const getProfile = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    
    return profile;
  },
});

// Mutation to create or update user profile
export const upsertProfile = mutation({
  args: {
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
    hairConcerns: v.optional(v.array(v.string())),
    hairGoals: v.optional(v.array(v.string())),
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
  },
  handler: async (ctx, args) => {
    // Check if profile exists
    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existingProfile) {
      // Update existing profile
      await ctx.db.patch(existingProfile._id, {
        name: args.name,
        age: args.age,
        hairType: args.hairType,
        hairConcerns: args.hairConcerns,
        hairGoals: args.hairGoals,
        porosity: args.porosity,
        thickness: args.thickness,
        length: args.length,
        updatedAt: Date.now(),
      });
      return existingProfile._id;
    } else {
      // Create new profile
      const profileId = await ctx.db.insert("profiles", {
        userId: args.userId,
        name: args.name,
        age: args.age,
        hairType: args.hairType,
        hairConcerns: args.hairConcerns,
        hairGoals: args.hairGoals,
        porosity: args.porosity,
        thickness: args.thickness,
        length: args.length,
        updatedAt: Date.now(),
      });
      return profileId;
    }
  },
});

