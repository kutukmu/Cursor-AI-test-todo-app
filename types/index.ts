import { Id } from "../convex/_generated/dataModel";

export interface Todo {
  _id: Id<"todos">;
  text: string;
  isCompleted: boolean;
  createdAt: number;
}

export type FilterType = "all" | "active" | "completed";

