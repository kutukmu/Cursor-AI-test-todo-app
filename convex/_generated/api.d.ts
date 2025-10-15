/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as profiles from "../profiles.js";
import type * as remedies from "../remedies.js";
import type * as seedComprehensiveRemedies from "../seedComprehensiveRemedies.js";
import type * as seedRemedies from "../seedRemedies.js";
import type * as todos from "../todos.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  profiles: typeof profiles;
  remedies: typeof remedies;
  seedComprehensiveRemedies: typeof seedComprehensiveRemedies;
  seedRemedies: typeof seedRemedies;
  todos: typeof todos;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
