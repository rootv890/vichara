import { api } from "@convex/_generated/api"
import { Doc } from "@convex/_generated/dataModel"
import { useMutation } from "convex/react"
import type { WithoutSystemFields } from "convex/server"
import React from "react"

type CreateNoteInput = WithoutSystemFields<Doc<"notes">>

export const useCreateNote = () => {
	const mutation = useMutation(api.notes.create)

	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState<Error | null>(null)

	// Promise style
	const createNotePromise = (data: CreateNoteInput) => {
		setIsLoading(true)
		setError(null)

		return mutation(data)
			.then((res) => {
				setIsLoading(false)
				return res
			})
			.catch((err) => {
				setError(err)
				setIsLoading(false)
				throw err
			})
	}

	// Async/await style
	const createNote = async (data: CreateNoteInput) => {
		try {
			setIsLoading(true)
			setError(null)
			return await mutation(data)
		} catch (err) {
			setError(err as Error)
			throw err
		} finally {
			setIsLoading(false)
		}
	}

	return {
		createNotePromise,
		createNote,
		isLoading,
		error,
	}
}
