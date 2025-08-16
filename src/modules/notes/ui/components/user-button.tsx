"use client"

import {
	ColorModeButton,
	ColorModeIcon,
	useColorMode,
} from "@/components/ui/color-mode"
import {
	Box,
	Button,
	IconButton,
	MenuArrow,
	MenuContent,
	MenuItem,
	MenuItemGroup,
	MenuPositioner,
	MenuRoot,
	MenuSeparator,
	MenuTrigger,
	Portal,
} from "@chakra-ui/react"
import { UserButton as ClerkUserButton } from "@clerk/nextjs"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"

type Props = {
	isCollapsed?: boolean
	className?: string
}

const UserButton = ({ isCollapsed, className }: Props) => {
	const { toggleColorMode, colorMode } = useColorMode()

	return (
		<Box
			mt="auto"
			w="full"
			display="flex"
			gap={2}
			flexDir={isCollapsed ? "column-reverse" : "row"}
			justifyContent={isCollapsed ? "center" : "flex-start"}
			borderTop={"1.5px solid "}
			borderColor={"gray.fg/10"}
			pt={2}
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

			{/* More actions */}
			<Box>
				<MenuRoot>
					<MenuTrigger asChild>
						<IconButton
							aria-label="More actions"
							size="xs"
							padding={"2"}
							variant="ghost"
							opacity={1}
							_hover={{ bg: "bg.emphasized" }}
							transition="all 0.15s ease"
							onClick={(e) => {
								e.stopPropagation()
							}} // prevent link navigation
						>
							<IoEllipsisHorizontalSharp className="size-3" />{" "}
						</IconButton>
					</MenuTrigger>

					<Portal>
						<MenuPositioner zIndex={1000}>
							<MenuContent rounded="xl">
								<MenuItem
									value="color-mode"
									className="w-full"
									rounded={"lg"}
									asChild
									bg={"bg"}
									justifyContent={"space-between"}
									_hover={{
										bg: "bg.emphasized",
									}}
								>
									<Button
										onClick={toggleColorMode}
										color={"fg"}
									>
										<ColorModeIcon />
										<span className="capitalize">Toggle Theme</span>
									</Button>
								</MenuItem>
							</MenuContent>
						</MenuPositioner>
					</Portal>
				</MenuRoot>
			</Box>
		</Box>
	)
}

export default UserButton
