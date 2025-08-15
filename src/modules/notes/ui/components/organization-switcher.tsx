"use client"

import { OrganizationSwitcher as ClerkOrganizationSwitcher } from "@clerk/nextjs"

type Props = {
	isCollapsed?: boolean
}

const OrganizationSwitcher = ({ isCollapsed }: Props) => {
	if (isCollapsed) return null

	return (
		<ClerkOrganizationSwitcher
			hidePersonal
			appearance={{
				elements: {
					rootBox: "size-full! rounded-full! max-w-[240px]! w-full!",
					organizationSwitcherTrigger:
						"hover:bg-[var(--hover-accent)]! w-full!",
					organizationSwitcherAvatarBox: "size-8! rounded-md! ",
					userPreview: "w-full! text-[var(--text-color)]! ",
					userPreviewAvatarIcon: "size-8! rounded-md! text-red-500!",
					organizationPreview: "text-[var(--text-color)]!",
					organizationSwitcherText:
						"pl-0! [data-collapsed=true]:hidden! text-[var(--text-color)]!",
					organizationSwitcherTriggerIcon: "size-4! text-[var(--text-color)]! ",
					organizationSwitcherPopoverCard:
						"bg-[var(--hover-accent)]! text-[var(--text-color)]! rounded-2xl! shadow-lg!",
					organizationSwitcherPopoverFooter: "hidden!",
					organizationSwitcherPreviewButton: "h-fit! p-2! px-6! rounded-md!",
					organizationSwitcherPopoverActionButton__createOrganization:
						"h-fit! p-4! px-6! rounded-md!",
				},
			}}
		/>
	)
}

export default OrganizationSwitcher
