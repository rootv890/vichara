"use client"
import { CgRename } from "react-icons/cg"

import { processNoteIcon } from "@/lib/utils"
import { isSidebarCollapsed, persistantCounter } from "@/modules/atoms"
import {
	Button,
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
import { useAtomValue, useSetAtom } from "jotai/react"
import NextLink from "next/link"

import { usePathname, useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
import { GoTriangleDown, GoTriangleRight } from "react-icons/go"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"
import { LuPlus, LuTrash2 } from "react-icons/lu"
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
	const persistantCounterNum = useAtomValue(persistantCounter)
	const setPersistantCounter = useSetAtom(persistantCounter)

	function handleNewNote() {
		if (!organization?.id || !user?.id) {
			toast.error("Organization or user not found")
			return
		}
		setPersistantCounter(persistantCounterNum + 1)
		toast
			.promise(
				// @ts-ignore will fix the TYPE
				createNotePromise({
					title: `New Note ${persistantCounterNum}`,
					parentNote: note._id,
				}),
				{
					loading: "Creating note...",
					success: "Note created!",
					error: (err) => `Error creating note: ${err.message}`,
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
			success: "Note moved to trash successfully!",
			error: (error) => {
				console.error("Error moving note:", error)
				return "Failed to move note to trash"
			},
		})
	}
	const indent = level * 12
	return (
		<>
			<HStack
				gap={1}
				bg={isActive ? "bg.emphasized" : "transparent"}
				_hover={{ bg: "bg.subtle" }}
				transition="background 0.2s ease"
				// Use margin-left for indent and subtract it from width to avoid clipping
				// CSS var allows calc without re-rendering style strings everywhere
				style={{ ["--indent" as any]: `${indent}px` }}
				ms="var(--indent)"
				rounded="md"
				px={3}
				py={1}
				w={`calc(100% - var(--indent)*${level})`}
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
							_hover={{ bg: "bg.muted" }}
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
							color="fg.subtle"
							dangerouslySetInnerHTML={{ __html: processNoteIcon(note.icon) }}
						/>
						{!isCollapsed && (
							<Text
								fontSize={"sm"}
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
					flexShrink={0}
				>
					<Button
						size="xs"
						padding={"2"}
						variant="ghost"
						opacity={1}
						h={"fit"}
						_hover={{ bg: "bg.muted" }}
						transition="all 0.15s ease"
						onClick={handleNewNote}
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
								_hover={{ bg: "bg.muted" }}
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
											onClick={handleNewNote}
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
										colorPalette="red"
										_hover={{ bg: "red.subtle" }}
										onClick={handleArchive}
										rounded={"lg"}
										className="flex items-center gap-2 justify-start "
									>
										<LuTrash2 className="size-3" />
										Move to Trash
									</MenuItem>
								</MenuContent>
							</MenuPositioner>
						</Portal>
					</MenuRoot>
				</HStack>
			</HStack>
		</>
	)
}

export default NoteSidebarItem
