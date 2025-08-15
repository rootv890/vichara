"use client"

import { Box } from "@chakra-ui/react"
import { UserButton as ClerkUserButton } from "@clerk/nextjs"

type Props = {
	isCollapsed?: boolean
}

const UserButton = ({ isCollapsed }: Props) => {
	return (
		<Box
			mt="auto"
			w="full"
			display="flex"
			justifyContent={isCollapsed ? "center" : "flex-start"}
		>
			<ClerkUserButton
				appearance={{
					elements: {
						rootBox: "size-full!",
						userButtonTrigger: "hover:bg-[var(--hover-accent)]! w-full!",
						avatarBox: "size-8! rounded-md!",
						userButtonBox:
							"w-full! flex-row-reverse! text-[var(--text-color)]! justify-end!",
						userButtonOuterIdentifier: "pl-0! [data-collapsed=true]:hidden!",
						userButtonPopoverCard:
							"bg-[var(--hover-accent)]! text-[var(--text-color)]! rounded-2xl! shadow-lg!",
						userButtonPopoverFooter: "hidden!",
						userButtonPopoverActionButton__manageAccount:
							"h-fit! p-3! px-6! rounded-md!",
						userButtonPopoverActionButton__signOut:
							"h-fit! p-3! px-6! rounded-md! text-red-500 hover:bg-red-500/10!",
					},
				}}
				showName={!isCollapsed}
			/>
		</Box>
	)
}

export default UserButton
