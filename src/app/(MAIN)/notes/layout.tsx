import { NotesLayout } from "@/modules/notes/ui/layouts/notes-layout"
import React from "react"

type Props = {
	children: React.ReactNode
}

const layout = ({ children }: Props) => {
	return <NotesLayout>{children}</NotesLayout>
}

export default layout
