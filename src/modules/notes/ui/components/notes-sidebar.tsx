"use client"

import { Button } from "@/components/ui/button"
import { useOrganization } from "@/modules/atoms"
import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { useUser } from "@clerk/nextjs"
import React from "react"
import toast from "react-hot-toast"
import { IoIosArrowBack } from "react-icons/io"
import { LuPlus } from "react-icons/lu"
import { TbMenu } from "react-icons/tb"
import { useCreateNote } from "../../hooks/use-create-note"
import NoteSidebarItem from "./note-sidebar-item"
import OrganizationSwitcher from "./organization-switcher"
import SidebarList from "./sidebar-list"
import SidebarSearchButton from "./sidebar-search"
import Trash from "./trash"
import UserButton from "./user-button"

type Props = {
	isCollapsed?: boolean
	onToggle?: () => void
}

const NotesSidebar = ({ isCollapsed, onToggle }: Props) => {
	const ref = React.useRef<HTMLDivElement>(null)
	const { organizationId } = useOrganization()
	const { user } = useUser()
	const { createNotePromise, isLoading } = useCreateNote()

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

	return (
		<Box
			ref={ref}
			w="280px" // Fixed width for consistent behavior
			pos="fixed" // Changed to fixed positioning
			top={0}
			left={0}
			h="100vh"
			bg="bg.muted"
			borderRight="1px solid"
			borderColor={"gray.fg/10"}
			transition="transform 0.3s ease-in-out"
			transform={isCollapsed ? "translateX(-100%)" : "translateX(0)"}
			zIndex={1200}
			p={2}
			css={{
				"--text-color": "colors.fg",
				"--hover-accent": "colors.bg.panel",
			}}
		>
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
					p={0}
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
					overflowY="auto"
					w={"full"}
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
						<LuPlus />{" "}
						<Text>{isLoading ? "Creating note..." : "New Note"}</Text>
					</Button>
					{/* list={notesList || []} */}
					{true && <SidebarList />}
				</VStack>

				{/* User section */}
				{/* Trash */}
				<Trash />
				<UserButton isCollapsed={false} />
			</VStack>
		</Box>
	)
}

export default NotesSidebar
