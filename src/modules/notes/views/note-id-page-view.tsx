"use client"
import { currentActiveNoteIdAtom, notesStatusAtom } from "@/modules/atoms/atoms"
import { Box, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai/react"
import React from "react"
import NoteIdNav from "../ui/components/note-id-nav"

interface Props {}

const NoteIdPageView = ({}: Props) => {
	const currentActiveNoteId = useAtomValue(currentActiveNoteIdAtom)
	const noteStatus = useAtomValue(notesStatusAtom)
	return (
		<VStack
			gap={4}
			align="stretch"
			w={"100%"}
			h={"full"}
			color={"fg"}
			bg={"bg"}
		>
			<Box>Note ID Page View: {currentActiveNoteId}</Box>
			{JSON.stringify(noteStatus, null, 2)}
		</VStack>
	)
}

export default NoteIdPageView
