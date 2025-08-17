"use client"
import { BouncyLoading, CardioLoading } from "@/components/loadings"
import { expandedNotesAtom, isSidebarCollapsed } from "@/modules/atoms/atoms"
import { Box, Button, Collapsible, Flex, For, VStack } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai/react"

import React from "react"
import { FaHistory } from "react-icons/fa"
import { GoTriangleRight } from "react-icons/go"
import NoteSidebarItem, { EmptyNoteSidebarItem } from "./note-sidebar-item"

type Props = {
	level?: number
	parentNoteId?: Id<"notes">
}

const SidebarList = ({ level = 0, parentNoteId }: Props) => {
	const isCollapsed = useAtomValue(isSidebarCollapsed)
	const expanded = useAtomValue(expandedNotesAtom)
	const setExpanded = useSetAtom(expandedNotesAtom)

	const notes = useQuery(api.notes.getAll, { parentNote: parentNoteId })

	const toggleExpand = (noteId: string) => {
		setExpanded((prev) => ({
			...prev,
			[noteId]: prev[noteId] ? !prev[noteId] : true,
		}))
	}

	if (notes === undefined) return <BouncyLoading label="Loading notes bro..." />

	const renderNotes = () => (
		<For
			each={notes}
			fallback={<EmptyNoteSidebarItem />}
		>
			{(note) => (
				<React.Fragment key={note._id}>
					<NoteSidebarItem
						note={note}
						onExpand={() => toggleExpand(note._id)}
						expanded={expanded[note._id]}
						level={level}
					/>
					{expanded[note._id] && (
						<SidebarList
							level={level + 1}
							parentNoteId={note._id}
						/>
					)}
				</React.Fragment>
			)}
		</For>
	)

	// Child levels (no collapsible wrapper)
	if (level > 0) {
		return (
			<VStack
				w="full"
				align="stretch"
				gap={0.5}
				ml={4}
			>
				{renderNotes()}
			</VStack>
		)
	}

	// Top level with collapsible wrapper
	return (
		<Box
			w="full"
			h="full"
			overflowY="auto"
			overflowX="auto" // Allow horizontal scrolling for nested notes
		>
			<VStack
				w="full"
				align="stretch"
				gap={0.5}
			>
				{renderNotes()}
			</VStack>
		</Box>
	)
}

export default SidebarList
