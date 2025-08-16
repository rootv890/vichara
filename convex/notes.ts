import { UserIdentity } from "convex/server"
import { v } from "convex/values"
import { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { requireIdentity, requireIdentityAndOrg } from "./_helpers/identity"

export const create = mutation({
	args: {
		title: v.string(),
		parentNote: v.optional(v.id("notes")), // for nested notes
	},
	async handler(ctx, args) {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject

		const newNote = await ctx.db.insert("notes", {
			title: args.title,
			userId,
			organizationId,
			isArchived: false,
			isPublished: false,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note-icon lucide-sticky-note"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg>`,
			parentNote: args.parentNote,
		})

		return newNote
	},
})

export const getAll = query({
	args: {
		parentNote: v.optional(v.id("notes")),
	},

	handler: async (ctx, args) => {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject
		const notes = ctx.db
			.query("notes")

			.withIndex("by_user_parent", (q) =>
				q.eq("userId", userId).eq("parentNote", args.parentNote)
			)
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), userId),
					q.eq(q.field("organizationId"), organizationId),
					q.eq(q.field("isArchived"), false)
				)
			)
			.order("desc")
			.collect()

		return notes
	},
})

// To check if a note has children returns a boolean
export const hasChildren = query({
	args: {
		noteId: v.id("notes"),
	},
	handler: async (ctx, args) => {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject

		const childNote = await ctx.db
			.query("notes")
			.withIndex("by_user_parent", (q) =>
				q.eq("userId", userId).eq("parentNote", args.noteId)
			)
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), userId),
					q.eq(q.field("organizationId"), organizationId),
					q.eq(q.field("isArchived"), false)
				)
			)
			.first()

		return !!childNote
	},
})

export const archive = mutation({
	args: {
		id: v.id("notes"),
	},
	async handler(ctx, args) {
		const identity = await requireIdentity(ctx)
		const userId = identity.subject

		const currentNote = await ctx.db.get(args.id)

		if (!currentNote) {
			throw new Error("Note not found")
		}

		if (currentNote.userId !== userId) {
			throw new Error("Unauthorized")
		}

		const recursivelyArchive = async (noteId: Id<"notes">) => {
			// recursively archive all child notes
			const childNotes = await ctx.db
				.query("notes")
				.withIndex("by_user_parent", (q) =>
					q.eq("userId", userId).eq("parentNote", noteId)
				)
				.collect()

			for (const child of childNotes) {
				await ctx.db.patch(child._id, {
					isArchived: true,
				})
				await recursivelyArchive(child._id)
			}
		}

		const note = await ctx.db.patch(args.id, {
			isArchived: true,
		})
		// Recursively archive child notes
		await recursivelyArchive(args.id)
		return note
	},
})
