import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	// tables collections, notes
	notes: defineTable({
		title: v.string(),
		userId: v.string(),
		organizationId: v.string(),
		isArchived: v.boolean(),
		parentNote: v.optional(v.id("notes")),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
		isPublished: v.boolean(),
		archivedAt: v.optional(v.number()), // in milliseconds
	})
		.searchIndex("search_notes_title", {
			searchField: "title",
			filterFields: ["userId", "organizationId", "isArchived"],
		})
		.index("by_user", ["userId"])
		.index("by_user_parent", ["userId", "parentNote"])
		.index("by_user_organization", ["userId", "organizationId"]),
})
