// returns a promise that resolves when the note is permanently deleted

import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useMutation } from "convex/react"

const usePermanentDelete = (noteId: Id<"notes"> | null) => {
	const deleteMutation = useMutation(api.notes.deleteNotePermanently)
	const deleteNote = async () => {
		if (noteId) {
			deleteMutation({ id: noteId })
		}
	}
	return { deleteNote }
}

export default usePermanentDelete
