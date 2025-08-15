"use client"
import { isSidebarCollapsed } from "@/modules/atoms/atoms"
import { Box, HStack } from "@chakra-ui/react"
import { useAtom, useAtomValue, useSetAtom } from "jotai/react"
import React, { useState } from "react"
import NotesSidebar from "../components/notes-sidebar"

type Props = {
	children: React.ReactNode
}

export const NotesLayout = ({ children }: Props) => {
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
