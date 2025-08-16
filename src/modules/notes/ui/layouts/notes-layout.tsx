"use client"
import { isSidebarCollapsed, useOrganization } from "@/modules/atoms"
import { Box, HStack } from "@chakra-ui/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import React from "react"
import NotesSidebar from "../components/notes-sidebar"

type Props = {
	children: React.ReactNode
}

export const NotesLayout = ({ children }: Props) => {
	// Initialize organization state management
	useOrganization()

	const isSidebarOpen = useAtomValue(isSidebarCollapsed)
	const setIsSidebarOpen = useSetAtom(isSidebarCollapsed)
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<HStack
			h="100vh"
			align="stretch"
			gap={0}
			overflow="hidden"
			bg="bg.subtle"
		>
			<NotesSidebar
				isCollapsed={isSidebarOpen}
				onToggle={toggleSidebar}
			/>
			<Box
				flex={1}
				h="100vh"
				overflowY="auto"
			>
				{children}
			</Box>
		</HStack>
	)
}
