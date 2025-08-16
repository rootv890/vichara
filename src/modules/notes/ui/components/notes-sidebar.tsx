"use client"
import { ColorModeButton } from "@/components/ui/color-mode"
import { useOrganization } from "@/modules/atoms"
import {
	Box,
	Button,
	Collapsible,
	Flex,
	For,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/react"
import { useUser } from "@clerk/nextjs"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import React from "react"
import toast from "react-hot-toast"
import { FaHistory } from "react-icons/fa"
import { GoTriangleRight } from "react-icons/go"
import { IoIosArrowBack } from "react-icons/io"
import { LuPlus } from "react-icons/lu"
import { TbMenu } from "react-icons/tb"
import { useCreateNote } from "../../hooks/use-create-note"
import NoteSidebarItem, { EmptyNoteSidebarItem } from "./note-sidebar-item"
import OrganizationSwitcher from "./organization-switcher"
import SearchButton from "./search"
import SidebarList from "./sidebar-list"
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
			w={isCollapsed ? "60px" : "fit"}
			maxW={"300px"}
			pos={"relative"}
			h="100vh"
			bg="bg.muted"
			borderRight="1px solid"
			borderColor={"gray.fg/10"}
			transition="width 0.3s ease"
			flexShrink={0}
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
					borderRadius="md"
				>
					<OrganizationSwitcher isCollapsed={isCollapsed} />
					<Button
						size="sm"
						variant="ghost"
						p="4px"
						onClick={onToggle}
						aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
					>
						{isCollapsed ? <TbMenu className="size-6" /> : <IoIosArrowBack />}
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
					<SearchButton />
					<Button
						variant="subtle"
						size="xs"
						aria-label="New Note"
						title="New Note"
						rounded={"l3"}
						onClick={handleNewNote}
						disabled={isLoading}
					>
						<LuPlus />{" "}
						{!isCollapsed && (
							<Text>{isLoading ? "Creating note..." : "New Note"}</Text>
						)}
					</Button>
					{/* list={notesList || []} */}
					{true && <SidebarList />}
				</VStack>

				{/* User section */}
				<UserButton isCollapsed={isCollapsed} />
			</VStack>
			{/* Sidebar Rail */}
			<Box
				pos="absolute"
				top={0}
				right={0}
				h="full"
				w="3px" // rail thickness
				cursor={isCollapsed ? "e-resize" : "w-resize"}
				_hover={{ bg: "gray.200", _dark: { bg: "gray.700" } }}
				onClick={onToggle}
			/>
		</Box>
	)
}

export default NotesSidebar
