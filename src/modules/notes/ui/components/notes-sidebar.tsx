"use client"
import { ColorModeButton } from "@/components/ui/color-mode"
import { useOrganization } from "@/modules/atoms"
import {
	Box,
	Button,
	Collapsible,
	Flex,
	For,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/react"
import { useUser } from "@clerk/nextjs"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import React from "react"
import toast from "react-hot-toast"
import { FaHistory } from "react-icons/fa"
import { GoTriangleRight } from "react-icons/go"
import { IoIosArrowBack } from "react-icons/io"
import { LuPlus } from "react-icons/lu"
import { TbMenu } from "react-icons/tb"
import { useCreateNote } from "../../hooks/use-create-note"
import NoteSidebarItem, { EmptyNoteSidebarItem } from "./note-sidebar-item"
import OrganizationSwitcher from "./organization-switcher"
import SearchButton from "./search"
import UserButton from "./user-button"

type Props = {
	isCollapsed?: boolean
	onToggle?: () => void
}

const NotesSidebar = ({ isCollapsed, onToggle }: Props) => {
	const ref = React.useRef<HTMLDivElement>(null)
	const { organizationId } = useOrganization()
	const { user } = useUser()
	const { createNotePromise, isLoading, error } = useCreateNote()

	const notesList = useQuery(api.notes.getAll, {})

	function handleNewNote() {
		if (!organizationId || !user?.id) {
			toast.error("Organization or user not found")
			return
		}

		toast.promise(
			// @ts-ignore will fix
			createNotePromise({
				title: "New Note",
				// isArchived: false,
				organizationId,
				userId: user.id,
			}),
			{
				loading: "Creating note...",
				success: "Note created!",
				error: (err) => `Error creating note: ${err.message}`,
			}
		)
	}

	// cmd + b to toggle sidebar
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === "KeyB" && event.metaKey) {
				event.preventDefault()
				onToggle?.()
			}
		}
		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [onToggle])

	return (
		<Box
			ref={ref}
			w={isCollapsed ? "60px" : "fit"}
			maxW={"300px"}
			pos={"relative"}
			h="100vh"
			bg="bg.muted"
			borderRight="1px solid"
			borderColor={"gray.fg/10"}
			transition="width 0.3s ease"
			flexShrink={0}
			p={2}
			css={{
				"--text-color": "colors.fg",
				"--hover-accent": "colors.bg.panel",
			}}
		>
			<VStack
				h="full"
				align="center"
				gap={4}
			>
				{/* Header */}
				<HStack>
					<OrganizationSwitcher isCollapsed={isCollapsed} />
					<Button
						size="sm"
						variant="ghost"
						p="4px"
						onClick={onToggle}
						aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
					>
						{isCollapsed ? <TbMenu className="size-6" /> : <IoIosArrowBack />}
					</Button>
				</HStack>

				{/* Content */}
				<VStack
					align="stretch"
					gap={2}
					flex={1}
					overflowY="auto"
					w={"full"}
				>
					<SearchButton />
					<Button
						variant="subtle"
						size="xs"
						aria-label="New Note"
						title="New Note"
						rounded={"l3"}
						onClick={handleNewNote}
						disabled={isLoading}
					>
						<LuPlus />{" "}
						{!isCollapsed && (
							<Text>{isLoading ? "Creating note..." : "New Note"}</Text>
						)}
					</Button>

					{true && (
						<VStack
							className="w-full"
							align="stretch"
							gap={0}
							flex={"1"}
							overflowY={"auto"}
						>
							<Collapsible.Root defaultOpen={true}>
								<Collapsible.Trigger asChild>
									<Button
										variant="ghost"
										size="sm"
										justifyContent="space-between"
										w="full"
										color="gray.fg"
										fontWeight="medium"
										px={2}
										py={1}
									>
										<Flex
											justify={"start"}
											alignItems={"center"}
											gap={2}
										>
											<FaHistory />
											{isCollapsed ? null : "Recent Notes"}
										</Flex>
										<GoTriangleRight />
									</Button>
								</Collapsible.Trigger>
								<Collapsible.Content>
									<VStack
										className="w-full h-full"
										align="stretch"
										gap={0.5}
									>
										<For
											each={notesList}
											fallback={<EmptyNoteSidebarItem />}
										>
											{(item, index) => (
												<NoteSidebarItem
													key={item._id}
													note={item}
													onRename={() => {
														toast.error(`Feature not implemented`)
													}}
													onDuplicate={() => {
														toast.error(`Feature not implemented`)
													}}
													onDelete={() => {
														toast.error(`Feature not implemented`)
													}}
												/>
											)}
										</For>
									</VStack>
								</Collapsible.Content>
							</Collapsible.Root>
						</VStack>
					)}
				</VStack>

				{/* User section */}
				<UserButton isCollapsed={isCollapsed} />
			</VStack>
			{/* Sidebar Rail */}
			<Box
				pos="absolute"
				top={0}
				right={0}
				h="full"
				w="3px" // rail thickness
				cursor={isCollapsed ? "e-resize" : "w-resize"}
				_hover={{ bg: "gray.200", _dark: { bg: "gray.700" } }}
				onClick={onToggle}
			/>
		</Box>
	)
}

export default NotesSidebar
