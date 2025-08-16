"use client"
import { Button } from "@/components/ui/button"
import { sidebarWidthAtom, useOrganization } from "@/modules/atoms"
import { Box, HStack, Text, VStack } from "@chakra-ui/react"
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

	// Keep DOM width in sync when atom changes (e.g., on load)
	React.useEffect(() => {
		if (ref.current && !isDragging) {
			ref.current.style.width = `${sidebarWidth}px`
		}
	}, [sidebarWidth, isDragging])

	function handleNewNote() {
		if (!organizationId || !user?.id) {
			toast.error("Organization or user not found")
			return
		}
		toast.promise(
			// @ts-ignore will fix the TYPE
			createNotePromise({
				title: `${Math.floor(Math.random() * 10)}-${organizationId}`,
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
			// fixed so it doesn't wrap or push your page content
			pos="fixed"
			top={0}
			left={0}
			h="100vh"
			// width is controlled via style (synced in effect + during drag)
			// set an initial width as a fallback
			w={`${sidebarWidth}px`}
			minW={`${MIN_WIDTH}px`}
			maxW={`${MAX_WIDTH}px`}
			bg="bg.muted"
			borderRight="1px solid"
			borderColor={"gray.fg/10"}
			// disable transform transition while dragging; keep it for collapse/expand
			transition={isDragging ? "none" : "transform 0.3s ease-in-out"}
			transform={isCollapsed ? "translateX(-100%)" : "translateX(0)"}
			zIndex={9999}
			p={2}
			css={{
				"--text-color": "colors.fg",
				"--hover-accent": "colors.bg.panel",
			}}
		>
			{/* Drag handle (inside sidebar, right edge) */}
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
					//  toggle sidebar
				}} // prevent click from bubbling to sidebar
				_hover={{ bg: "gray.300" }}
				role="separator"
				aria-orientation="vertical"
			/>

			<VStack
				h="full"
				align="center"
				gap={4}
			>
				{/* Header */}
				<HStack
					w="full"
					justify="space-between"
					align="center"
					pb={1}
					borderRadius="md"
					borderBottom={"1px solid"}
					borderColor={"gray.fg/10"}
				>
					<OrganizationSwitcher isCollapsed={false} />
					<Button
						size="sm"
						variant="ghost"
						p="1"
						onClick={onToggle}
						aria-label="Close sidebar"
					>
						<IoIosArrowBack />
					</Button>
				</HStack>

				{/* Content */}
				<VStack
					align="stretch"
					gap={2}
					flex={1}
					w="full"
				>
					<SidebarSearchButton />
					<Button
						variant="surface"
						size="sm"
						aria-label="New Note"
						title="New Note"
						border={"none"}
						onClick={handleNewNote}
						disabled={isLoading}
						display="flex"
						justifyContent="flex-start"
						alignItems="center"
						gap={3}
						w="full"
					>
						<LuPlus />
						<Text>{isLoading ? "Creating note..." : "New Note"}</Text>
					</Button>
					<SidebarList />
				</VStack>

				{/* Footer */}
				<Trash />
				<UserButton isCollapsed={false} />
			</VStack>
		</Box>
	)
}

export default NotesSidebar
