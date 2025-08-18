"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { currentActiveNoteIdAtom, notesStatusAtom } from "@/modules/atoms"
import { Badge, Box, Editable } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import React from "react"
import toast from "react-hot-toast"
import { LuLock } from "react-icons/lu"

type EditableTitleVariant = "navbar" | "layer"

interface Props {
	variant?: EditableTitleVariant
}

const variantStyles = {
	navbar: {
		preview: {
			fontSize: "2xl",
			fontWeight: 500, // subtle bold like Notion
			px: 0,
			py: 0,
			cursor: "text",
			_hover: { textDecoration: "underline" },
		},
		input: {
			fontSize: "2xl",
			fontWeight: 500, // slightly heavier when editing
			px: 0,
			py: 0,
		},
	},
	layer: {
		preview: {
			fontSize: "sm",
			fontWeight: "medium", // semibold but not heavy
			px: "inherit",
			py: "inherit",
			cursor: "pointer",
			_hover: { bg: "bg.muted", textDecoration: "underline" },
		},
		input: {
			fontSize: "lg",
			fontWeight: 600, // subtle boldness while editing
			px: 1,
			py: 1,
		},
	},
} as const

const EditableTitle = ({ variant = "navbar" }: Props) => {
	const currentNoteId = useAtomValue(currentActiveNoteIdAtom)
	const noteStatus = useAtomValue(notesStatusAtom)
	const setStatus = useSetAtom(notesStatusAtom)
	const updateNoteQuery = useMutation(api.notes.updateNote)

	const fetchedNote = useQuery(
		api.notes.getNoteById,
		currentNoteId ? { id: currentNoteId } : "skip"
	)

	const [localTitle, setLocalTitle] = React.useState("")

	if (fetchedNote === undefined) {
		return (
			<Box
				w="112px"
				h="40px"
				borderRadius="md"
				bg="bg.subtle"
			>
				<Skeleton />
			</Box>
		)
	}

	React.useEffect(() => {
		if (fetchedNote?.title) {
			setLocalTitle(fetchedNote.title)
		}
	}, [fetchedNote?.title])

	React.useEffect(() => {
		if (variant === "navbar") {
			document.title = localTitle ? `${localTitle} | Vichara` : "Vichara"
		}
	}, [localTitle, variant])

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
				setLocalTitle(fetchedNote?.title || "")
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

	const styles = variantStyles[variant]

	return (
		<Box
			w="full"
			borderRadius="md"
			transition="all 0.15s ease"
		>
			<Editable.Root
				value={localTitle}
				onValueChange={handleChange}
				onValueCommit={handleSave}
				placeholder="Untitled"
				activationMode={"dblclick"}
				selectOnFocus
				disabled={
					noteStatus.changingTitle ||
					noteStatus.saving ||
					fetchedNote?.isArchived
				}
			>
				<Editable.Preview
					{...styles.preview}
					_empty={{
						color: "fg.muted",
						_before: { content: '"Untitled"' },
					}}
				/>
				<Editable.Input
					{...styles.input}
					border="none"
					_focus={{ border: "none", boxShadow: "none", outline: "none" }}
					_placeholder={{ color: "fg.muted" }}
				/>

				{fetchedNote?.isArchived && (
					<Badge
						colorPalette={"red"}
						variant={"subtle"}
					>
						<LuLock />
					</Badge>
				)}
			</Editable.Root>
		</Box>
	)
}

export default EditableTitle
