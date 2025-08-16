import { UserIdentity } from "convex/server"
import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireIdentityAndOrg } from "./_helpers/identity"

export const create = mutation({
	args: {
		title: v.string(),
		userId: v.string(),
		organizationId: v.string(),
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
		})

		return newNote
	},
})

// GET One

// export const getOne = query({
// 	args: {
// 		id: v.string(),
// 		organizationId: v.string(),
// 	},
// 	async handler(ctx, args) {
// 		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
// 		const userId = identity.subject
// 		const note = await ctx.db.get(args.id)
// 	},
// })

export const getAll = query({
	args: {
		parentNoteId: v.optional(v.id("notes")),
	},

	handler: async (ctx, args) => {
		const { identity, organizationId } = await requireIdentityAndOrg(ctx)
		const userId = identity.subject
		const notes = ctx.db
			.query("notes")
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), userId),
					q.eq(q.field("organizationId"), organizationId)
				)
			)
			.collect()

		return notes
	},
})
