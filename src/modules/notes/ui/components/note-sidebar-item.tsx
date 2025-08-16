"use client"
import { CgRename } from "react-icons/cg"

import { cn, processNoteIcon } from "@/lib/utils"
import { isSidebarCollapsed } from "@/modules/atoms"
import {
	Box,
	Button,
	EmptyState,
	HStack,
	IconButton,
	Link,
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

import { CloseButton, Dialog } from "@chakra-ui/react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
import { GoTriangleDown, GoTriangleRight } from "react-icons/go"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"
import { LuDelete, LuPlus, LuTrash2 } from "react-icons/lu"
import { useCreateNote } from "../../hooks/use-create-note"

type Props = {
	note: Doc<"notes">

	onExpand?: () => void
	expanded?: boolean
	level?: number
}

const NoteSidebarItem = ({
	note,
	onExpand,
	expanded = false,
	level = 0,
}: Props) => {
	const isCollapsed = useAtomValue(isSidebarCollapsed)
	// const createNestedNode = useMutation(api.notes.create)
	const [confirmDelete, setConfirmDelete] = React.useState(false)
	const router = useRouter()
	const pathname = usePathname()
	const { createNotePromise } = useCreateNote()
	const { user, organization } = useClerk()
	const isActive = pathname.includes(note._id)
	// Create a new nested note
	const handleCreateNestedNote = async () => {
		if (!organization?.id || !user?.id) {
			toast.error("Organization or user not found")
			return
		}
		toast
			.promise(
				// @ts-ignore will fix the TYPE
				createNotePromise({
					title: `New Note ${Math.floor(Math.random() * 5)}`,
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
			.then((newNoteId) => {
				// expand the parent note if it has children and is not already expanded
				if (onExpand && !expanded) onExpand()
				// Navigate to the newly created note, not the parent
				router.push(`/notes/${newNoteId}`)
			})
	}
	const archive = useMutation(api.notes.archive)

	// Check if this note has children
	const hasChildren = useQuery(api.notes.hasChildren, { noteId: note._id })

	const handleArchive = async (
		e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
	) => {
		if (e) {
			e.stopPropagation()
		}
		if (!note._id) {
			toast.error("Note not found")
			return
		}

		toast.promise(archive({ id: note._id }), {
			loading: "Moving to trash...",
			success: "Note deleted successfully!",
			error: (error) => {
				console.error("Error deleting note:", error)
				return "Failed to Delete note"
			},
		})
	}
	const indent = level * 12
	return (
		<>
			<HStack
				gap={1}
				bg={isActive ? "gray.fg/30" : "transparent"}
				_hover={{ bg: "bg" }}
				transition="background 0.2s ease"
				// Use margin-left for indent and subtract it from width to avoid clipping
				// CSS var allows calc without re-rendering style strings everywhere
				style={{ ["--indent" as any]: `${indent}px` }}
				ms="var(--indent)"
				rounded="md"
				px={3}
				py={1}
				w={`calc(100% - var(--indent))`}
				minW={0}
				overflow="hidden"
				align="center"
				justify="space-between"
				role="group"
				className="group/sidebaritem"
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
							color={"fg.subtle"}
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
				<HStack
					gap={1}
					alignItems={"center"}
					justify={"center"}
					color={"fg"}
					flexShrink={0}
				>
					<Button
						size="xs"
						padding={"2"}
						variant="ghost"
						opacity={1}
						h={"fit"}
						_hover={{ bg: "bg.emphasized" }}
						transition="all 0.15s ease"
						onClick={handleCreateNestedNote}
						p={"0!important"}
					>
						<LuPlus className="size-3 group-hover/sidebaritem:opacity-100 opacity-0" />
					</Button>

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
							<MenuPositioner w="fit">
								<MenuContent
									maxH="300px"
									rounded="lg"
									zIndex={999999}
								>
									<MenuItem
										value="rename"
										onClick={() => {
											toast.error(`Feature not implemented`)
										}}
										rounded={"lg"}
										className="flex items-center gap-2 justify-start "
									>
										<CgRename className="size-3" />
										Rename
									</MenuItem>

									<MenuItemGroup>
										<MenuItem
											value="duplicate"
											onClick={handleCreateNestedNote}
											rounded={"lg"}
											className="flex items-center gap-2 justify-start "
										>
											<LuPlus className="size-3" />
											New Note
										</MenuItem>
									</MenuItemGroup>

									<MenuSeparator />
									<MenuArrow />

									<MenuItem
										value="delete"
										color="red.fg"
										_hover={{ bg: "red.500/50" }}
										onClick={(e) => {
											e.stopPropagation()
											setConfirmDelete(true)
										}}
										rounded={"lg"}
										className="flex items-center gap-2 justify-start "
									>
										<LuTrash2 className="size-3" />
										Delete
									</MenuItem>
								</MenuContent>
							</MenuPositioner>
						</Portal>
					</MenuRoot>
				</HStack>
			</HStack>

			{/* Delete Dialog - Moved outside the menu */}
			<DeleteDialog
				noteId={note._id}
				onDelete={handleArchive}
				confirmDelete={confirmDelete}
				setConfirmDelete={setConfirmDelete}
			/>
		</>
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

const DeleteDialog = ({
	noteId,
	onDelete,
	confirmDelete = false,
	setConfirmDelete,
}: {
	noteId: string
	onDelete?: () => void
	confirmDelete: boolean
	setConfirmDelete: (value: boolean) => void
}) => {
	return (
		<Dialog.Root
			open={confirmDelete}
			onOpenChange={(e) => setConfirmDelete(e.open)}
			role="alertdialog"
			placement={"center"}
			motionPreset="slide-in-bottom"
			size={"sm"}
		>
			<Portal>
				{/* <Dialog.Backdrop /> */}
				<Dialog.Positioner>
					<Dialog.Content
						bg={"bg"}
						color={"fg"}
						rounded="lg"
					>
						<Dialog.Header>
							<Dialog.Title>
								Are you sure you want to delete this note?
							</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<p>
								Deleting this note will remove all its content and any nested
								notes will also be deleted. Can be recovered from the{" "}
								<Link
									href="/trash"
									variant={"underline"}
								>
									trash
								</Link>
								.
							</p>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</Dialog.ActionTrigger>
							<Button
								bg={"red.subtle"}
								color={"red.fg"}
								onClick={() => {
									onDelete?.()
									setConfirmDelete(false)
								}}
								loadingText="Deleting..."
							>
								Delete
							</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}
