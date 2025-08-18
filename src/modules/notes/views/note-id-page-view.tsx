"use client"
import { BouncyLoading } from "@/components/loadings"
import { currentActiveNoteIdAtom, notesStatusAtom } from "@/modules/atoms/atoms"
import { Box, VStack } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useAtomValue } from "jotai/react"
import { notFound } from "next/navigation"
import React from "react"
import NoteBanner from "../ui/components/note-banner"
import NoteIdNav from "../ui/components/note-id-nav"
import NotesLoading from "../ui/components/notes-loading"

interface Props {}

const NoteIdPageView = ({}: Props) => {
	const currentNoteId = useAtomValue(currentActiveNoteIdAtom)
	const noteStatus = useAtomValue(notesStatusAtom)

	// check for note ID validation
	const fetchedNote = useQuery(
		api.notes.getNoteById,
		currentNoteId ? { id: currentNoteId } : "skip"
	)

	if (fetchedNote === undefined) {
		return (
			<NotesLoading
				message="Loading your note..."
				size={100}
				takeFullScreen={true}
			/>
		)
	}

	// jh7e3xmfcvzbxv0w37efryj33n7nxtpb

	if (!fetchedNote) {
		return notFound()
	}

	return (
		<VStack
			gap={4}
			align="stretch"
			w={"100%"}
			h={"full"}
		>
			<NoteIdNav />
			<NoteBanner currentNoteId={currentNoteId} />
			<Box>Note ID Page View: {currentNoteId}</Box>
			{JSON.stringify(noteStatus, null, 2)}
		</VStack>
	)
}

export default NoteIdPageView
