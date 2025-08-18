import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useMutation } from "convex/react"

const useNoteDuplication = () => {
	const duplicateMutation = useMutation(api.notes.duplicateNote)
	const duplicateNote = async (id: Id<"notes">) => {
		if (id) {
			return duplicateMutation({ id })
		}
	}
	return { duplicateNote }
}

export default useNoteDuplication
