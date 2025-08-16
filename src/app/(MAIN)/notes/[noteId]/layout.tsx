import React from "react"

interface Props {
	children: React.ReactNode
}
const NoteIdLayout = ({ children }: Props) => {
	return (
		<div style={{ color: "var(--chakra-colors-fg)" }}>
			NoteIdLayout {children}
		</div>
	)
}

export default NoteIdLayout
