"use client"

import {
	gutterWidthAtom,
	persistantCounter,
	sidebarWidthAtom,
	useOrganization,
} from "@/modules/atoms"
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react"
import { useUser } from "@clerk/nextjs"
import { useAtomValue, useSetAtom } from "jotai/react"
import React from "react"
import toast from "react-hot-toast"
import { IoIosArrowBack } from "react-icons/io"
import { LuPlus } from "react-icons/lu"
import "react-resizable/css/styles.css"
import { useCreateNote } from "../../hooks/use-create-note"

import OrganizationSwitcher from "./organization-switcher"
import SidebarList from "./sidebar-list"
import SidebarSearchButton from "./sidebar-search"
import Trash from "./trash"
import UserButton from "./user-button"

type Props = {
	isCollapsed?: boolean
	onToggle?: () => void
}

const MIN_WIDTH = 200
const MAX_WIDTH = 500

const clamp = (n: number, min = MIN_WIDTH, max = MAX_WIDTH) =>
	Math.min(max, Math.max(min, n))

const NotesSidebar = ({ isCollapsed, onToggle }: Props) => {
	const ref = React.useRef<HTMLDivElement | null>(null)
	const { organizationId } = useOrganization()
	const { user } = useUser()
	const { createNotePromise, isLoading } = useCreateNote()
	const sidebarWidth = useAtomValue(sidebarWidthAtom)
	const setSidebarWidth = useSetAtom(sidebarWidthAtom)
	const [isDragging, setIsDragging] = React.useState(false)
	const persistantCounterNum = useAtomValue(persistantCounter)
	const setPersistantCounter = useSetAtom(persistantCounter)
	// Keep DOM width in sync when atom changes (e.g., on load)
	React.useEffect(() => {
		if (ref.current && !isDragging) {
			ref.current.style.width = `${sidebarWidth}px`
		}
	}, [sidebarWidth, isDragging])

	// gutter width reset on sidebar toggle
	const setGutterWidth = useSetAtom(gutterWidthAtom)
	React.useEffect(() => {
		if (!isCollapsed) {
			setGutterWidth(0) // Reset gutter width when collapsed
		}
	}, [isCollapsed])

	function handleNewNote() {
		if (!organizationId || !user?.id) {
			toast.error("Organization or user not found")
			return
		}

		setPersistantCounter(persistantCounterNum + 1)

		toast.promise(
			// @ts-ignore will fix the TYPE
			createNotePromise({
				title: `New Note ${persistantCounterNum}`,
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

	// Drag logic (absolute handle on the right edge)
	const startResize = (e: React.MouseEvent) => {
		setIsDragging(true)
		const startX = e.clientX
		const startWidth = ref.current
			? parseInt(getComputedStyle(ref.current).width, 10)
			: sidebarWidth

		// prevent text selection + show resize cursor
		const prevUserSelect = document.body.style.userSelect
		const prevCursor = document.body.style.cursor
		document.body.style.userSelect = "none"
		document.body.style.cursor = "col-resize"

		const onMouseMove = (ev: MouseEvent) => {
			const next = clamp(startWidth + (ev.clientX - startX))
			if (ref.current) ref.current.style.width = `${next}px` // live update without re-render
		}

		const onMouseUp = (ev: MouseEvent) => {
			const finalW = clamp(startWidth + (ev.clientX - startX))
			setSidebarWidth(finalW)
			setIsDragging(false)

			// cleanup
			document.removeEventListener("mousemove", onMouseMove)
			document.removeEventListener("mouseup", onMouseUp)
			document.body.style.userSelect = prevUserSelect
			document.body.style.cursor = prevCursor
		}

		document.addEventListener("mousemove", onMouseMove)
		document.addEventListener("mouseup", onMouseUp)
	}

	return (
		<Box
			ref={ref}
			as="aside"
			// Fixed positioning - doesn't affect page layout flow
			pos="fixed"
			top={0}
			left={0}
			h="100vh" // Full viewport height as requested
			maxH="100vh"
			overflow="hidden" // Prevent overflow on the main container
			// Width controlled via style attribute (synced in effect + during drag)
			w={`${sidebarWidth}px`}
			minW={`${MIN_WIDTH}px`}
			maxW={`${MAX_WIDTH}px`}
			bg="bg.muted"
			borderRight="1px solid"
			borderColor={"gray.fg/10"}
			// Smooth transitions for collapse/expand, disabled during drag
			transition={isDragging ? "none" : "transform 0.3s ease-in-out"}
			transform={isCollapsed ? "translateX(-100%)" : "translateX(0)"}
			p={2}
			css={{
				"--text-color": "colors.fg",
				"--hover-accent": "colors.bg.panel",
			}}
		>
			{/*
				=== RESIZE HANDLE ===
				Absolute positioned drag handle on the right edge for resizing
			*/}
			<Box
				position="absolute"
				right={0}
				top={0}
				w="3px"
				h="100%"
				cursor="col-resize"
				onMouseDown={startResize}
				onDoubleClick={(e) => {
					onToggle?.()
					e.stopPropagation()
				}}
				_hover={{ bg: "gray.300" }}
				role="separator"
				aria-orientation="vertical"
				aria-label="Resize sidebar"
			/>

			{/*
				=== MAIN GRID LAYOUT ===
				CSS Grid with 3 rows:
				- Row 1 (Header): auto height - takes only natural space needed
				- Row 2 (Body): 1fr - fills all remaining space
				- Row 3 (Footer): auto height - takes only natural space needed
			*/}
			<Box
				h="full"
				w="full"
				display="grid"
				gridTemplateRows="auto 1fr auto" // Header (auto) | Body (expand) | Footer (auto)
				gridTemplateColumns="1fr"
				gap={3} // Consistent spacing between sections
				overflow="hidden" // Prevent grid container overflow
			>
				{/*
					=== HEADER SECTION ===
					Contains: Organization Switcher + Sidebar Toggle + Search + New Note
					Height: auto (takes only space needed)
				*/}
				<Box
					w="full"
					gridRow={1}
					overflow="hidden" // Prevent header content overflow
				>
					{/* Organization Switcher + Toggle Button Row */}
					<HStack
						w="full"
						justify="space-between"
						align="center"
						mb={3}
						pb={2}
						borderBottom="1px solid"
						borderColor="gray.fg/10"
						minW={0} // Allow content to shrink below natural size
					>
						{/* Organization Switcher - flexible width */}
						<Box
							flex="1"
							minW={0} // Allow shrinking for overflow handling
							overflow="hidden"
						>
							<OrganizationSwitcher isCollapsed={false} />
						</Box>

						{/* Sidebar Toggle Button - fixed width */}
						<Button
							size="sm"
							variant="ghost"
							p="1"
							onClick={onToggle}
							aria-label="Toggle sidebar"
							flexShrink={0} // Maintain button size
							ml={2}
						>
							<IoIosArrowBack />
						</Button>
					</HStack>

					{/* Search + New Note Actions Row */}
					<VStack
						align="stretch"
						gap={2}
						w="full"
					>
						{/* Command Palette / Search Trigger */}
						<SidebarSearchButton />

						{/* New Note Button */}
						<Button
							variant="ghost"
							onClick={handleNewNote}
							disabled={isLoading}
							gap={3}
							justifyContent={"flex-start"}
							rounded={"lg"}
						>
							<LuPlus />
							<Text fontWeight="medium">
								{isLoading ? "Creating note..." : "New Note"}
							</Text>
						</Button>
					</VStack>
				</Box>

				{/*
					=== BODY SECTION ===
					Contains: Sidebar List (notes/folders with nesting support)
					Height: 1fr (fills all remaining space between header and footer)
					Scrolling: Vertical scrolling when content exceeds available space
					Horizontal: Enabled for nested items that exceed width
				*/}
				<Box
					w="full"
					gridRow={2}
					overflow="hidden" // Container doesn't overflow
					display="flex"
					flexDirection="column"
					minH={0} // Critical: allows flex child to shrink below content size
				>
					{/*
						Notes List Container with Scroll Management
						- Vertical scroll when notes exceed available height
						- Horizontal scroll for deeply nested items
						- Maintains proper nested hierarchy
					*/}
					<Box
						flex="1"
						w="full"
						overflowY="auto" // Vertical scrolling for long lists
						overflowX="auto" // Horizontal scrolling for nested content
						minH={0} // Allow shrinking below content
						// Custom scrollbar styling
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
						}}
					>
						{/*
							SidebarList Component:
							- Renders all notes with nested structure
							- Handles expansion/collapse of nested items
							- Supports infinite nesting levels
							- Optimized scrolling behavior
						*/}
						<SidebarList />
					</Box>
				</Box>

				{/*
					=== FOOTER SECTION ===
					Contains: Trash Button + User Profile + More Actions (theme changer)
					Height: auto (takes only space needed)
					Always visible at bottom
				*/}
				<Box
					w="full"
					gridRow={3}
					overflow="hidden" // Prevent footer overflow
				>
					<VStack
						w="full"
						gap={2}
						align="stretch"
						py={4}
						p={1}
					>
						{/* Trash/Recycle Bin Button */}
						<Trash />

						{/* User Profile + More Actions */}
						<UserButton isCollapsed={false} />
					</VStack>
				</Box>
			</Box>
		</Box>
	)
}

export default NotesSidebar
