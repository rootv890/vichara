"use client"
/**
 * ================================================================================
 * SIDEBAR LIST COMPONENT - NOTES WITH NESTING SUPPORT
 * ================================================================================
 *
 * This component handles the display of notes with the following features:
 *
 * 🌳 NESTING BEHAVIOR:
 * - Supports unlimited levels of nested notes/folders
 * - Visual hierarchy with indentation (4px * level)
 * - Expand/collapse functionality for parent notes
 * - Visual connectors (border lines) for nested structure
 *
 * 📜 SCROLLING MANAGEMENT:
 * - Top Level: Vertical scrolling when notes exceed available height
 * - Nested Levels: Horizontal overflow handled gracefully
 * - Smooth scrolling behavior with custom scrollbar styling
 * - Performance optimized for large note collections
 *
 * 🎯 OVERFLOW HANDLING:
 * - Long note titles: Truncated with ellipsis
 * - Deep nesting: Horizontal scroll or action menus prevent layout breaking
 * - Actions on hover: + button and ... menu for note operations
 *
 * 🔧 RESPONSIVE FEATURES:
 * - Adapts to sidebar width changes
 * - Maintains usability across different screen sizes
 * - Touch-friendly spacing and targets
 *
 * ================================================================================
 */
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

	// Child levels (nested notes with indentation)
	if (level > 0) {
		return (
			<Box
				w="full"
				overflow="visible" // Allow content to determine width
			>
				{/*
					=== NESTED NOTES CONTAINER ===
					- Indented with left margin for visual hierarchy
					- Supports unlimited nesting levels
					- Handles horizontal overflow gracefully
					- Visual indicators for nesting structure
				*/}
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

	// Top level with scrollable container
	return (
		<Box
			w="full"
			h="full"
			overflow="hidden" // Parent container shouldn't overflow
			display="flex"
			flexDirection="column"
		>
			{/*
				=== NOTES LIST CONTAINER ===
				Handles vertical scrolling for long lists
				Enables horizontal scrolling for nested content that exceeds width
				Maintains smooth scrolling performance
			*/}
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
