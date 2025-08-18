import { currentActiveNoteIdAtom } from "@/modules/atoms"
import { Badge, Button, Flex, Group, HStack } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react"
import { useAtomValue } from "jotai/react"
import React from "react"
import toast from "react-hot-toast"
import NavMenu from "./nav-menu"
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
			<Group>
				<EditableTitle variant="navbar" />
				{/* Archived?? */}
			</Group>
			<Badge colorPalette={fetchedNote.isArchived ? "red" : "green"}>
				{fetchedNote.isArchived ? "Archived" : "Active"}
			</Badge>

			{/* Archived?? */}
			<HStack>
				<Button
					variant={"ghost"}
					size={"sm"}
					onClick={() => {
						toast.error("This feature is not implemented yet")
					}}
				>
					Publish
				</Button>
				<NavMenu />
			</HStack>
		</HStack>
	)
}

export default NoteIdNav
