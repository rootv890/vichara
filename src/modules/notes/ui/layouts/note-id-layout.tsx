"use client"
import { gutterWidthAtom, isSidebarCollapsed } from "@/modules/atoms"
import { Box, HStack, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai/react"
import React from "react"
import NoteIdNav from "../components/note-id-nav"

type Props = {
	children: React.ReactNode
}

const NoteIdLayout = ({ children }: Props) => {
	// const isCollapsed = useAtomValue(isSidebarCollapsed)
	const gutterWidth = useAtomValue(gutterWidthAtom)

	return (
		<HStack
			h={"full"}
			gap={0}
			alignItems="stretch"
		>
			{/*ToDO: Replace the space with a gutter */}
			<Box
				width={gutterWidth}
				h={"full"}
				bg={"bg.muted"}
				transition={"all 0.2s ease-in-out "}
			/>

			<VStack
				width="100%"
				height="100%"
				padding={0}
				overflowY="auto"
				bg={"bg"}
				color={"fg"}
			>
				{children}
			</VStack>
		</HStack>
	)
}

export default NoteIdLayout
