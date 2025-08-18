import { currentActiveNoteIdAtom } from "@/modules/atoms"
import { Badge, HStack } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react"
import { useAtomValue } from "jotai/react"
import React from "react"
import EditableTitle from "./title-editable"

type Props = {}

const NoteIdNav = (props: Props) => {
	const currentNoteId = useAtomValue(currentActiveNoteIdAtom)
	const fetchedNote = useQuery(
		api.notes.getNoteById,
		currentNoteId ? { id: currentNoteId } : "skip"
	)

	if (fetchedNote === undefined) {
		return null // or a loading state
	}
	return (
		<HStack
			gap={4}
			w="full"
			h="fit"
			p={3}
			bg={"bg.panel"}
			justify={"space-between"}
		>
			<EditableTitle variant="navbar" />
			{/* Archived?? */}
			<Badge colorPalette={fetchedNote.isArchived ? "red" : "green"}>
				{fetchedNote.isArchived ? "Archived" : "Active"}
			</Badge>
		</HStack>
	)
}

export default NoteIdNav
