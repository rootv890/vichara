import { currentActiveNoteIdAtom } from "@/modules/atoms"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react"
import { useAtomValue } from "jotai/react"

const useFetchNotes = () => {
	const currentActiveNoteId = useAtomValue(currentActiveNoteIdAtom)

	const fetchedNote = useQuery(
		api.notes.getNoteById,
		currentActiveNoteId ? { id: currentActiveNoteId } : "skip"
	)

	const loading = fetchedNote === undefined

	return { loading, fetchedNote }
}

export default useFetchNotes
