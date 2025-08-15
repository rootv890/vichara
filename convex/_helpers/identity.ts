/* const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Not Authenticated",
      })
    }

    const organizationId = identity.organizationId
    if (!organizationId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      })
    } */

import {
	GenericActionCtx,
	GenericDataModel,
	GenericMutationCtx,
	GenericQueryCtx,
} from "convex/server"
import { ConvexError } from "convex/values"

export async function requireIdentity<T extends GenericDataModel>(
	ctx: GenericQueryCtx<T> | GenericActionCtx<T> | GenericMutationCtx<T>
) {
	const identity = await ctx.auth.getUserIdentity()
	if (!identity) {
		throw new ConvexError({
			code: "UNAUTHENTICATED",
			message: "User is not authenticated",
		})
	}
	return identity
}

export async function requireOrganizationId<T extends GenericDataModel>(
	ctx: GenericQueryCtx<T> | GenericActionCtx<T> | GenericMutationCtx<T>
) {
	const identity = await requireIdentity(ctx)

	const organizationId = identity.organizationId
	if (!organizationId) {
		throw new ConvexError({
			code: "NO_ORGANIZATION",
			message: "User is not associated with any organization",
		})
	}

	return organizationId
}

export async function requireIdentityAndOrg<T extends GenericDataModel>(
	ctx: GenericQueryCtx<T> | GenericActionCtx<T> | GenericMutationCtx<T>
) {
	const identity = await requireIdentity(ctx)
	const organizationId = identity.organizationId as string | undefined
	if (!organizationId) {
		throw new ConvexError({
			code: "NO_ORGANIZATION",
			message: "User is not associated with any organization",
		})
	}
	return { identity, organizationId }
}
