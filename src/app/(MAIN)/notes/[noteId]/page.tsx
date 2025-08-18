"use client"

import { currentActiveNoteIdAtom } from "@/modules/atoms"
import NotesLoading from "@/modules/notes/ui/components/notes-loading"
import RetryComponent from "@/modules/notes/ui/components/retry-component"
import NoteIdPageView from "@/modules/notes/views/note-id-page-view"
import { Id } from "@convex/_generated/dataModel"
import { useSetAtom } from "jotai/react"
import React, { Suspense, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
interface Props {
	params: Promise<{ noteId: string }>
}

const NoteIdPage = ({ params }: Props) => {
	const setActiveNoteId = useSetAtom(currentActiveNoteIdAtom)
	const { noteId } = React.use(params)

	// update atom when URL param changes
	useEffect(() => {
		setActiveNoteId(noteId as Id<"notes">)
	}, [noteId, setActiveNoteId])

	return (
		<ErrorBoundary
			fallback={
				<RetryComponent
					title="Failed to load note"
					message="We couldn't load this note. This might be due to a network issue or the note may have been deleted."
					description="Please check your connection and try again, or navigate back to your notes."
				/>
			}
		>
			<Suspense
				fallback={
					<NotesLoading
						message="Loading your note..."
						size={56}
						takeFullScreen
					/>
				}
			>
				<NoteIdPageView />
			</Suspense>
		</ErrorBoundary>
	)
}

export default NoteIdPage
