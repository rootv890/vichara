"use client"

import {
	Button,
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
	Span,
	Text,
} from "@chakra-ui/react"
import { Doc } from "@convex/_generated/dataModel"
import NextLink from "next/link"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"

type Props = {
	note: Doc<"notes">
	onRename?: () => void
	onDuplicate?: () => void
	onDelete?: () => void
}

const NoteSidebarItem = ({ note, onRename, onDuplicate, onDelete }: Props) => {
	return (
		<LinkBox
			role="group"
			rounded="xl"
			px={3}
			py={1}
			bg="bg.subtle"
			_hover={{ bg: "bg.muted" }}
			transition="background 0.2s ease"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			_focusWithin={{ outline: "2px solid", outlineColor: "gray.focusRing" }}
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
						<NextLink href={`/notes/${note._id}`}>
							<Text fontSize={"sm"}>{note.title ?? "Untitled"}</Text>
						</NextLink>
					</LinkOverlay>
				</Span>
			</HStack>

			<MenuRoot>
				<MenuTrigger asChild>
					<IconButton
						aria-label="More actions"
						size="xs"
						padding={"1"}
						variant="ghost"
						opacity={1}
						w={"fit"}
						_groupHover={{ opacity: 1 }}
						_hover={{ bg: "bg.emphasized" }}
						transition="opacity 0.15s ease"
						onClick={(e) => {
							e.stopPropagation()
							// e.preventDefault()
						}} // prevent link navigation
					>
						<IoEllipsisHorizontalSharp className="size-5" />{" "}
					</IconButton>
				</MenuTrigger>

				<MenuPositioner>
					<MenuContent rounded={"lg"}>
						<MenuItem
							value="rename"
							onClick={() => {
								onRename?.()
							}}
						>
							Rename
						</MenuItem>

						<MenuItemGroup>
							<MenuItem
								value="duplicate"
								onClick={() => {
									onDuplicate?.()
								}}
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
							onClick={() => {
								onDelete?.()
							}}
						>
							Delete
						</MenuItem>
					</MenuContent>
				</MenuPositioner>
			</MenuRoot>
		</LinkBox>
	)
}

export default NoteSidebarItem
