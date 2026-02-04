import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    name: v.string(),
    phone: v.string(),
    pickup_location: v.string(),
    dropoff_location: v.string(),
    notes: v.optional(v.string()),
    status: v.string(), // pending, on_the_way, delivered, cancelled
  }).index("by_status", ["status"]),
});
