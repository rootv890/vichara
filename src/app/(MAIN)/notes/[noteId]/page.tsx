import { Box } from "@chakra-ui/react"
import React from "react"

interface Props {
	params: Promise<{ noteId: string }>
}

const NoteIdPage = async ({ params }: Props) => {
	const { noteId } = await params
	return <Box color={"fg"}>{noteId}</Box>
}

export default NoteIdPage
