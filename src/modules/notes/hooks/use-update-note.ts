// returns a promise that resolves when the note is permanently deleted

import { api } from "@convex/_generated/api"
import { Doc, Id } from "@convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { WithoutSystemFields } from "convex/server"

// interface Note
type Note = {
	title?: string | undefined
	isArchived?: boolean | undefined
	parentNote?: Id<"notes"> | undefined
	content?: string | undefined
	coverImage?: string | undefined
	icon?: string | undefined
	isPublished?: boolean | undefined
	archivedAt?: number | undefined
}

const useUpdateNote = () => {
	const updateMutation = useMutation(api.notes.updateNote)
	const updateNote = async (
		updatedFields: Note,
		noteId: Id<"notes"> | null
	) => {
		if (noteId) {
			updateMutation({ id: noteId, ...updatedFields })
		}
	}
	return { updateNote }
}

export default useUpdateNote
