"use client"
import { currentActiveNoteIdAtom, notesStatusAtom } from "@/modules/atoms"
import { Box, Editable } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import React from "react"
import toast from "react-hot-toast"

const EditableTitle = () => {
	const currentNoteId = useAtomValue(currentActiveNoteIdAtom)
	const noteStatus = useAtomValue(notesStatusAtom)
	const setStatus = useSetAtom(notesStatusAtom)

	const fetchedNote = useQuery(
		api.notes.getNoteById,
		currentNoteId ? { id: currentNoteId } : "skip"
	)

	const updateNoteQuery = useMutation(api.notes.updateNote)
	const [localTitle, setLocalTitle] = React.useState("")

	// Sync local state with fetched note
	React.useEffect(() => {
		if (fetchedNote?.title) {
			setLocalTitle(fetchedNote.title)
		}
	}, [fetchedNote?.title])

	const handleSave = React.useCallback(
		async (details: { value: string }) => {
			const trimmed = details.value.trim()
			if (!currentNoteId) return
			if (trimmed === fetchedNote?.title?.trim()) return
			setStatus((prev) => ({ ...prev, changingTitle: true, saving: true }))
			try {
				await updateNoteQuery({
					id: currentNoteId as Id<"notes">,
					title: trimmed || "Untitled",
				})
				setLocalTitle(trimmed || "Untitled")
			} catch (error) {
				toast.error("Failed to update note title")
				console.error("Error updating note:", error)
			} finally {
				setStatus((prev) => ({ ...prev, changingTitle: false, saving: false }))
			}
		},
		[currentNoteId, fetchedNote?.title, updateNoteQuery]
	)

	const handleChange = (details: { value: string }) => {
		setLocalTitle(details.value)
	}

	return (
		<Box
			w="full"
			py={1}
			px={2}
			borderRadius="md"
			transition="all 0.15s ease"
			_hover={{
				bg: "bg.subtle",
			}}
		>
			<Editable.Root
				value={localTitle}
				onValueChange={handleChange}
				onValueCommit={handleSave}
				placeholder="Untitled"
				activationMode="dblclick"
				selectOnFocus
			>
				<Editable.Preview
					fontSize="2xl"
					fontWeight="bold"
					color="fg"
					lineHeight="shorter"
					minH="40px"
					display="flex"
					alignItems="center"
					px={1}
					py={2}
					cursor="text"
					borderRadius="md"
					transition="all 0.15s ease"
					_hover={{
						bg: "bg.muted",
					}}
					_empty={{
						color: "fg.muted",
						_before: {
							content: '"Untitled"',
						},
					}}
				/>
				<Editable.Input
					fontSize="2xl"
					fontWeight="bold"
					color="fg"
					lineHeight="shorter"
					minH="40px"
					px={1}
					py={2}
					border="none"
					borderColor="none"
					borderRadius="md"
					bg="bg"
					_focus={{
						borderColor: "none",
						boxShadow: "none",
						outline: "none",
					}}
					_placeholder={{
						color: "fg.muted",
					}}
				/>
			</Editable.Root>
		</Box>
	)
}

export default EditableTitle
