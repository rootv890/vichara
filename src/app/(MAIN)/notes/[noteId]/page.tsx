"use client"

import { currentActiveNoteIdAtom } from "@/modules/atoms"
import NoteIdPageView from "@/modules/notes/views/note-id-page-view"
import { useSetAtom } from "jotai/react"
import React, { useEffect } from "react"

interface Props {
	params: { noteId: string }
}

const NoteIdPage = ({ params }: Props) => {
	const setActiveNoteId = useSetAtom(currentActiveNoteIdAtom)
	const { noteId } = params

	// update atom when URL param changes
	useEffect(() => {
		setActiveNoteId(noteId)
	}, [noteId, setActiveNoteId])

	return <NoteIdPageView />
}

export default NoteIdPage
