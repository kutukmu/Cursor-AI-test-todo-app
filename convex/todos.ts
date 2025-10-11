import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all todos for a specific user sorted by creation time
export const getTodos = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("todos")
      .withIndex("by_user_and_creation", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Mutation to create a new todo
export const addTodo = mutation({
  args: { 
    text: v.string(),
    userId: v.string(),
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
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
      createdAt: Date.now(),
      userId: args.userId,
      category: args.category,
      productName: args.productName,
      notes: args.notes,
    });
    return todoId;
  },
});

// Mutation to toggle todo completion status
export const toggleTodo = mutation({
  args: { 
    id: v.id("todos"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== args.userId) throw new Error("Unauthorized");
    
    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

// Mutation to delete a todo
export const deleteTodo = mutation({
  args: { 
    id: v.id("todos"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== args.userId) throw new Error("Unauthorized");
    
    await ctx.db.delete(args.id);
  },
});

// Mutation to update todo text
export const updateTodo = mutation({
  args: { 
    id: v.id("todos"),
    text: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== args.userId) throw new Error("Unauthorized");
    
    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

// Mutation to delete all completed todos for a user
export const clearCompleted = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const todos = await ctx.db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
    
    await Promise.all(
      todos.map((todo) => ctx.db.delete(todo._id))
    );
  },
});

