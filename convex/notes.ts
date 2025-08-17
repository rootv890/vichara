import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { Doc, Id } from "./_generated/dataModel"
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

// paginated notes
export const getPaginatedNotes = query({
	args: {
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject

		const notes = ctx.db
			.query("notes")
			.withIndex("by_user_organization", (q) =>
				q.eq("userId", userId).eq("organizationId", organizationId)
			)
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), userId),
					q.eq(q.field("organizationId"), organizationId),
					q.eq(q.field("isArchived"), false)
				)
			)
			.order("desc")
			.paginate(args.paginationOpts)

		return notes
	},
})

export const searchNotes2 = query({
	args: {
		search: v.string(),
	},
	handler: async (ctx, args) => {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject

		if (!args.search.trim()) {
			// No search string → return all notes
			return await ctx.db
				.query("notes")
				.withIndex("by_user_organization", (q) =>
					q.eq("userId", userId).eq("organizationId", organizationId)
				)
				.filter((q) =>
					q.and(
						q.eq(q.field("userId"), userId),
						q.eq(q.field("organizationId"), organizationId),
						q.eq(q.field("isArchived"), false)
					)
				)
				.take(100)
		}

		// Normal search
		return await ctx.db
			.query("notes")
			.withSearchIndex("search_notes_title", (q) =>
				q
					.search("title", args.search)
					.eq("userId", userId)
					.eq("organizationId", organizationId)
					.eq("isArchived", false)
			)
			.take(100)
	},
})

export const searchNotes = query({
	args: {
		search: v.string(),
	},
	handler: async (ctx, args) => {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject

		const notes = ctx.db
			.query("notes")
			.withSearchIndex("search_notes_title", (qry) =>
				qry
					.search("title", args.search)
					.eq("userId", userId)
					.eq("organizationId", organizationId)
					.eq("isArchived", false)
			)
			.take(100) // limit to 100 results
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
					archivedAt: Date.now(),
				})
				await recursivelyArchive(child._id)
			}
		}

		const note = await ctx.db.patch(args.id, {
			isArchived: true,
			archivedAt: Date.now(),
		})
		// Recursively archive child notes
		await recursivelyArchive(args.id)
		return note
	},
})

export const getTrash = query({
	async handler(ctx) {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject

		const notes = await ctx.db
			.query("notes")
			.withIndex("by_user_organization", (q) =>
				q.eq("userId", userId).eq("organizationId", organizationId)
			)
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), userId),
					q.eq(q.field("organizationId"), organizationId),
					q.eq(q.field("isArchived"), true)
				)
			)
			.order("desc")
			.collect()

		return notes
	},
})

export const restoreFromTrash = mutation({
	args: {
		id: v.id("notes"),
	},
	async handler(ctx, args) {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject

		const existingNote = await ctx.db.get(args.id)

		if (!existingNote) {
			throw new Error("Note not found")
		}

		if (existingNote.userId !== userId) {
			throw new Error("Unauthorized")
		}

		if (existingNote.organizationId !== organizationId) {
			throw new Error("Unauthorized")
		}

		const updatedNote = await ctx.db.patch(args.id, {
			isArchived: false,
		})

		const recursivelyRestore = async (noteId: Id<"notes">) => {
			const childNotes = await ctx.db
				.query("notes")
				.withIndex("by_user_parent", (q) =>
					q.eq("userId", userId).eq("parentNote", noteId)
				)
				.collect()

			for (const child of childNotes) {
				await ctx.db.patch(child._id, {
					isArchived: false,
				})
				// for its child
				await recursivelyRestore(child._id)
			}
		}

		// recursively restore parent notes if they are archived
		const options: Partial<Doc<"notes">> = {
			isArchived: false,
		}
		if (existingNote.parentNote) {
			const parent = await ctx.db.get(existingNote.parentNote)
			if (parent && parent.isArchived) {
				await ctx.db.patch(parent._id, options)
			}
		}
		recursivelyRestore(existingNote._id)
		return updatedNote
	},
})

export const deleteNotePermanently = mutation({
	args: {
		id: v.id("notes"),
	},
	async handler(ctx, args) {
		const identity = await requireIdentity(ctx)
		const userId = identity.subject

		const existingNote = await ctx.db.get(args.id)

		if (!existingNote) {
			throw new Error("Note not found")
		}

		if (existingNote.userId !== userId) {
			throw new Error("Unauthorized")
		}

		await ctx.db.delete(args.id)

		return existingNote
	},
})
