import NoteIdLayout from "@/modules/notes/ui/layouts/note-id-layout"
import React from "react"

interface Props {
	children: React.ReactNode
}
const NoteIdLayoutWrapper = ({ children }: Props) => {
	return <NoteIdLayout>{children}</NoteIdLayout>
}

export default NoteIdLayoutWrapper
