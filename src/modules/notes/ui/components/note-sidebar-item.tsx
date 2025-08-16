"use client"

import { processNoteIcon } from "@/lib/utils"
import { isSidebarCollapsed } from "@/modules/atoms"
import {
	EmptyState,
	HStack,
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
	Text,
} from "@chakra-ui/react"
import { useClerk } from "@clerk/nextjs"
import { api } from "@convex/_generated/api"
import { Doc } from "@convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useAtomValue } from "jotai/react"
import Image from "next/image"
import NextLink from "next/link"
import toast from "react-hot-toast"
import { GoTriangleDown, GoTriangleRight } from "react-icons/go"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"
import { useCreateNote } from "../../hooks/use-create-note"

type Props = {
	note: Doc<"notes">
	onRename?: () => void
	onDuplicate?: () => void
	onDelete?: () => void
	onExpand?: () => void
	expanded?: boolean
	level?: number
}

const NoteSidebarItem = ({
	note,
	onRename,
	onDuplicate,
	onDelete,
	onExpand,
	expanded = false,
	level = 0,
}: Props) => {
	const isCollapsed = useAtomValue(isSidebarCollapsed)
	// const createNestedNode = useMutation(api.notes.create)
	const { createNotePromise } = useCreateNote()
	const { user, organization } = useClerk()

	// Create a new nested note
	const handleCreateNestedNote = async () => {
		if (!organization?.id || !user?.id) {
			toast.error("Organization or user not found")
			return
		}
		toast.promise(
			// @ts-ignore will fix the TYPE
			createNotePromise({
				title: `New Nested Note-${Math.floor(Math.random() * 5)}`,
				parentNote: note._id,
			}),

			{
				loading: "Creating nested note...",
				success: "Nested note created successfully!",
				error: (error) => {
					console.error("Error creating nested note:", error)
					return "Failed to create nested note"
				},
			},
			{
				success: {
					iconTheme: {
						primary: "var(--chakra-colors-bg)",
						secondary: "var(--chakra-colors-fg)",
					},
				},
			}
		)
	}

	// Check if this note has children
	const hasChildren = useQuery(api.notes.hasChildren, { noteId: note._id })

	return (
		<div
			className="group/sidebaritem"
			style={{ marginLeft: `${level * 12}px` }} // Indent based on level
		>
			<HStack
				gap={1}
				bg="bg.muted"
				_hover={{ bg: "bg" }}
				transition="background 0.2s ease"
				rounded="md"
				px={3}
				py={1}
				align="center"
				justify="space-between"
				role="group"
			>
				<HStack
					gap={1}
					flex="1"
					minW={0}
				>
					{/* Expand/Collapse Button */}
					{hasChildren ? (
						<IconButton
							aria-label={expanded ? "Collapse" : "Expand"}
							size="xs"
							variant="ghost"
							padding="1"
							h="16px"
							w="16px"
							minW="16px"
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								console.log(
									"Expanding note:",
									note._id,
									"Current expanded state:",
									expanded
								)
								onExpand?.()
							}}
							_hover={{ bg: "bg.emphasized" }}
						>
							{expanded ? (
								<GoTriangleDown className="size-3" />
							) : (
								<GoTriangleRight className="size-3" />
							)}
						</IconButton>
					) : null}

					<NextLink
						href={`/notes/${note._id}`}
						className="flex items-center justify-start gap-2 flex-1 min-w-0"
					>
						<Text
							as="span"
							fontSize="xs"
							dangerouslySetInnerHTML={{ __html: processNoteIcon(note.icon) }}
						/>
						{!isCollapsed && (
							<Text
								fontSize={"sm"}
								color="fg"
								fontWeight="medium"
								truncate
							>
								{note.title ?? "Untitled"}
							</Text>
						)}
					</NextLink>
				</HStack>

				<MenuRoot>
					<MenuTrigger asChild>
						<IconButton
							aria-label="More actions"
							size="xs"
							padding={"2"}
							variant="ghost"
							opacity={1}
							h={"16px"}
							_hover={{ bg: "bg.emphasized" }}
							transition="all 0.15s ease"
							onClick={(e) => {
								e.stopPropagation()
							}} // prevent link navigation
						>
							<IoEllipsisHorizontalSharp className="size-3 group-hover/sidebaritem:opacity-100 opacity-0" />
						</IconButton>
					</MenuTrigger>

					<Portal>
						<MenuPositioner
							w="fit"
							zIndex={1000}
						>
							<MenuContent
								maxH="300px"
								rounded="lg"
							>
								<MenuItem
									value="rename"
									onClick={onRename}
								>
									Rename
								</MenuItem>

								<MenuItemGroup>
									<MenuItem
										value="duplicate"
										onClick={handleCreateNestedNote}
									>
										New Note
									</MenuItem>
								</MenuItemGroup>

								<MenuSeparator />
								<MenuArrow />

								<MenuItem
									value="delete"
									color="red.fg"
									_hover={{ bg: "red.500/50" }}
									onClick={onDelete}
								>
									Delete
								</MenuItem>
							</MenuContent>
						</MenuPositioner>
					</Portal>
				</MenuRoot>
			</HStack>
		</div>
	)
}

export default NoteSidebarItem

export const EmptyNoteSidebarItem = () => {
	return (
		<EmptyState.Root
			color={"fg"}
			textAlign={"center"}
		>
			<EmptyState.Content gap={2}>
				<EmptyState.Indicator>
					<Image
						src="/illustrations/empty-notes.svg"
						alt="No notes"
						width={100}
						height={100}
					/>
				</EmptyState.Indicator>
				<EmptyState.Title>No notes to show</EmptyState.Title>
				<EmptyState.Description>
					Create one to get started!
				</EmptyState.Description>
			</EmptyState.Content>
		</EmptyState.Root>
	)
}
