"use client"
import {
	isSidebarCollapsed,
	sidebarWidthAtom,
	useOrganization,
} from "@/modules/atoms"
import { Box, HStack } from "@chakra-ui/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import React from "react"
import FloatingSidebarToggle from "../components/floating-sidebar-toggle"
import NotesSidebar from "../components/notes-sidebar"

type Props = {
	children: React.ReactNode
}

export const NotesLayout = ({ children }: Props) => {
	// Initialize organization state management
	useOrganization()

	const isSidebarOpen = useAtomValue(isSidebarCollapsed)
	const sidebarWidth = useAtomValue(sidebarWidthAtom)
	const setIsSidebarOpen = useSetAtom(isSidebarCollapsed)
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	// Close sidebar when clicking backdrop on mobile
	const handleBackdropClick = () => {
		if (window.innerWidth < 768) {
			setIsSidebarOpen(true) // true means collapsed/closed
		}
	}

	return (
		<Box
			h="100vh"
			overflow="hidden"
			bg="bg.subtle"
			position="relative"
		>
			{/* Backdrop - only visible on smaller screens when sidebar is open */}
			{!isSidebarOpen && (
				<Box
					position="fixed"
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg="blackAlpha.500"
					zIndex={1100}
					onClick={handleBackdropClick}
					display={{ base: "block", md: "none" }}
					transition="opacity 0.3s ease-in-out"
					h="full"
					w="full"
				/>
			)}

			{/* Floating toggle button - only visible when sidebar is collapsed */}
			<FloatingSidebarToggle
				onToggle={toggleSidebar}
				isVisible={isSidebarOpen}
			/>

			{/* Sidebar */}
			<NotesSidebar
				isCollapsed={isSidebarOpen}
				onToggle={toggleSidebar}
			/>

			{/* Main content */}
			<Box
				ml={{ base: 0, md: isSidebarOpen ? 0 : sidebarWidth }}
				h="100vh"
				overflowY="auto"
				transition="margin-left 0.3s ease-in-out"
			>
				{children}
			</Box>
		</Box>
	)
}
