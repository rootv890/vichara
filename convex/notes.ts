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
		userId: v.string(),
		organizationId: v.string(),
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
