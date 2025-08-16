"use client"

import { useClerk } from "@clerk/nextjs"
import { api } from "@convex/_generated/api"
import { useAction } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { organizationIdAtom } from "../atoms"

export const useOrganization = () => {
	const { organization } = useClerk()
	const organizationId = useAtomValue(organizationIdAtom)
	const setOrganizationId = useSetAtom(organizationIdAtom)
	const validateOrganization = useAction(api.organizations.validate)

	useEffect(() => {
		if (!organization) {
			setOrganizationId(null)
			return
		}

		const currentOrgId = organization.id

		// If the stored organization ID matches the current one, no need to revalidate
		if (organizationId === currentOrgId) {
			return
		}

		validateOrganization({ organizationId: currentOrgId })
			.then((result) => {
				if (!result.valid) {
					console.error("Organization validation failed:", result)
					toast.error(result.reason || "Organization validation failed")
					setOrganizationId(null)
				} else {
					setOrganizationId(currentOrgId)
				}
			})
			.catch((error) => {
				console.error("Failed to validate organization:", error)
				toast.error("Failed to validate organization: " + error.message)
				setOrganizationId(null)
			})
	}, [organization, organizationId, validateOrganization, setOrganizationId])

	return {
		organizationId,
		organization,
		isValidating: !organizationId && !!organization,
	}
}
