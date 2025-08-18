"use client"
import { currentActiveNoteIdAtom } from "@/modules/atoms"
import {
	Box,
	Button,
	CloseButton,
	Dialog,
	HStack,
	Mark,
	Portal,
	Text,
} from "@chakra-ui/react"
import { useAtomValue } from "jotai/react"
import React from "react"
import { LuArchiveRestore, LuTrash2 } from "react-icons/lu"

import ConfirmationDialog, {
	DeleteDialog,
	RestoreDialog,
} from "@/components/confirmation-dialog"
import usePermanentDelete from "@/hooks/use-permanent-delete"
import { Id } from "@convex/_generated/dataModel"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import useFetchNotes from "../../hooks/use-fetch-notes"
import useRestoreNote from "../../hooks/useRestoreNote"
type Props = {
	currentNoteId: Id<"notes"> | null
}

const NoteBanner = ({ currentNoteId }: Props) => {
	const { loading, fetchedNote } = useFetchNotes()
	const { deleteNote } = usePermanentDelete(currentNoteId)
	const { restoreNote } = useRestoreNote(currentNoteId)

	const [confirmDelete, setConfirmDelete] = React.useState(false)
	const [confirmRestore, setConfirmRestore] = React.useState(false)
	const router = useRouter()

	if (loading || !fetchedNote) return null

	// Assume your note has an "archived" flag
	if (!currentNoteId) return null
	if (!fetchedNote.isArchived) return null

	const handleRestore = () => {
		// TODO: wire up mutation to restore note
		// restoreNote
		toast.promise(restoreNote, {
			loading: "Restoring note...",
			success: "Note restored successfully",
			error: "Failed to restore note",
		})
		router.push(`/notes/${currentNoteId}`)
	}

	const handleDelete = () => {
		// TODO: wire up mutation to permanently delete
		toast.promise(deleteNote, {
			loading: "Deleting note...",
			success: "Note deleted permanently",
			error: "Failed to delete note",
		})
		router.push("/notes")
	}

	return (
		<HStack
			w="full"
			px={3}
			py={2}
			bg="yellow.100"
			rounded="none"
			justify="space-between"
			border="1px solid"
			borderColor="yellow.300"
		>
			<Text
				fontWeight="medium"
				color="yellow.800"
			>
				This note is archived. You cannot edit unless you restore it.
			</Text>

			<Box>
				<Button
					size="sm"
					variant="outline"
					colorScheme="green"
					mr={2}
					onClick={() => setConfirmRestore(true)}
				>
					<LuArchiveRestore />
					Restore
				</Button>
				<Button
					size="sm"
					colorPalette="red"
					color={"colorPalette.fg"}
					bg={"colorPalette.300"}
					onClick={() => setConfirmDelete(true)}
				>
					<LuTrash2 />
					Delete Permanently
				</Button>
			</Box>
			<DeleteDialog
				noteId={currentNoteId}
				onDelete={handleDelete}
				confirmDelete={confirmDelete}
				setConfirmDelete={setConfirmDelete}
			/>
			{/* Restore Dialog */}
			<RestoreDialog
				noteId={currentNoteId}
				onRestore={handleRestore}
				confirmRestore={confirmRestore}
				setConfirmRestore={setConfirmRestore}
			/>
		</HStack>
	)
}

export default NoteBanner
