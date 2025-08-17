import { currentActiveNoteIdAtom } from "@/modules/atoms"
import { HStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai/react"
import React from "react"
import EditableTitle from "./title-editable"

type Props = {}

const NoteIdNav = (props: Props) => {
	const activeNoteId = useAtomValue(currentActiveNoteIdAtom)
	return (
		<HStack
			gap={4}
			w="full"
			h="fit"
			p={3}
			bg={"bg.panel"}
			justify={"space-between"}
		>
			<EditableTitle />
			NoteIdNav: {activeNoteId}
		</HStack>
	)
}

export default NoteIdNav
