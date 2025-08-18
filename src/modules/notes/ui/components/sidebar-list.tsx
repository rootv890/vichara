"use client"

import { expandedNotesAtom, isSidebarCollapsed } from "@/modules/atoms/atoms"
import { Box, For, VStack } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai/react"

import React from "react"
import { EmptyNoteSidebarItem } from "./empty-sidebar"
import NoteSidebarItem from "./note-sidebar-item"

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

	if (notes === undefined) return <Box>Loading notes...</Box>

	const renderNotes = (isRoot = false) => (
		<For
			each={notes}
			fallback={isRoot ? <EmptyNoteSidebarItem /> : null}
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

	// Child levels (nested notes with indentation)
	if (level > 0) {
		return (
			<Box
				w="full"
				overflow="visible" // Allow content to determine width
			>
				<VStack
					w="full"
					align="stretch"
					gap={0.5}
					ml={4} // Indentation for nested level (4px per level)
					pl={2} // Additional padding for visual separation
					borderLeft="1px solid"
					borderColor="gray.200"
					_dark={{
						borderColor: "gray.700",
					}}
					position="relative"
					// Subtle hover effect for nested containers
					_hover={{
						borderColor: "gray.400",
						_dark: {
							borderColor: "gray.500",
						},
					}}
					transition="border-color 0.2s ease"
					// Handle overflow for deeply nested content
					css={{
						// Small connector line for visual hierarchy
						"&::before": {
							content: '""',
							position: "absolute",
							left: 0,
							top: "12px",
							width: "8px",
							height: "1px",
							backgroundColor: "var(--chakra-colors-bg-muted)",
							transition: "background-color 0.2s ease",
						},
						// Enhanced connector on hover
						"&:hover::before": {
							backgroundColor: "var(--chakra-colors-gray-400)",
						},
					}}
				>
					{renderNotes()}
				</VStack>
			</Box>
		)
	}

	return (
		<Box
			w="full"
			h="full"
			overflow="hidden" // Parent container shouldn't overflow
			display="flex"
			flexDirection="column"
		>
			<Box
				w="full"
				h="full"
				overflowY="auto" // Vertical scroll for long note lists
				overflowX="hidden" // Hide horizontal scroll unless needed for nested items
				// Custom scrollbar styling for better UX
				css={{
					"&::-webkit-scrollbar": {
						width: "6px",
					},
					"&::-webkit-scrollbar-track": {
						background: "transparent",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "var(--chakra-colors-gray-400)",
						borderRadius: "3px",
					},
					"&::-webkit-scrollbar-thumb:hover": {
						background: "var(--chakra-colors-gray-500)",
					},
					// Smooth scrolling behavior
					scrollBehavior: "smooth",
				}}
			>
				{/*
					Notes List Content
					- Flexible spacing for better visual hierarchy
					- Responsive to content changes
				*/}
				<VStack
					w="full"
					align="stretch"
					gap={0.5}
					p={1} // Small padding for better touch targets
					pb={4} // Extra bottom padding for better scroll ending
				>
					{renderNotes()}
				</VStack>
			</Box>
		</Box>
	)
}

export default SidebarList
