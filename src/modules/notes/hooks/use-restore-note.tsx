// returns a promise that resolves when the note is permanently deleted

import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useMutation } from "convex/react"

const useRestoreNote = (noteId: Id<"notes"> | null) => {
	const restoreMutation = useMutation(api.notes.restoreFromTrash)
	const restoreNote = async () => {
		if (noteId) {
			restoreMutation({ id: noteId })
		}
	}
	return { restoreNote }
}

export default useRestoreNote
