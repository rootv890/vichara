"use client"

import { processNoteIcon } from "@/lib/utils"
import { isSidebarCollapsed } from "@/modules/atoms"
import {
	EmptyState,
	HStack,
	IconButton,
	LinkBox,
	LinkOverlay,
	MenuArrow,
	MenuContent,
	MenuItem,
	MenuItemGroup,
	MenuPositioner,
	MenuRoot,
	MenuSeparator,
	MenuTrigger,
	Portal,
	Span,
	Text,
	VStack,
} from "@chakra-ui/react"
import { Doc } from "@convex/_generated/dataModel"
import { useAtomValue } from "jotai/react"
import Image from "next/image"
import NextLink from "next/link"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"

type Props = {
	note: Doc<"notes">
	onRename?: () => void
	onDuplicate?: () => void
	onDelete?: () => void
}

const NoteSidebarItem = ({ note, onRename, onDuplicate, onDelete }: Props) => {
	const isCollapsed = useAtomValue(isSidebarCollapsed)
	return (
		<LinkBox
			role="group"
			rounded="md"
			px={3}
			py={1}
			bg="bg.muted"
			_hover={{ bg: "bg" }}
			transition="background 0.2s ease"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			_focusWithin={{ outline: "2px solid", outlineColor: "gray.focusRing" }}
			className="group/sidebaritem"
		>
			<HStack
				gap={3}
				flex="1"
				minW={0}
			>
				<Span
					color="fg"
					fontWeight="medium"
					flex="1"
					minW={0}
					truncate
				>
					<LinkOverlay asChild>
						<NextLink
							href={`/notes/${note._id}`}
							className="flex items-center justify-start gap-2"
						>
							<Text
								as="span"
								fontSize="xs"
								dangerouslySetInnerHTML={{ __html: processNoteIcon(note.icon) }}
							/>
							{!isCollapsed && (
								<Text fontSize={"sm"}>{note.title ?? "Untitled"}</Text>
							)}
						</NextLink>
					</LinkOverlay>
				</Span>
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
						<IoEllipsisHorizontalSharp className="size-3 group-hover/sidebaritem:opacity-100 opacity-0" />{" "}
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
									onClick={onDuplicate}
								>
									Duplicate
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
		</LinkBox>
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
