"use client"

import { createContext, useContext } from "react"
import { useNotesCommandSearch } from "../hooks/use-notes-command-search"

type CommandSearchContextType = ReturnType<typeof useNotesCommandSearch>

const CommandSearchContext = createContext<CommandSearchContextType | null>(
	null
)

export const CommandSearchProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const commandSearchState = useNotesCommandSearch()

	console.log("CommandSearchProvider - open state:", commandSearchState.open)

	return (
		<CommandSearchContext.Provider value={commandSearchState}>
			{children}
		</CommandSearchContext.Provider>
	)
}

export const useCommandSearchContext = () => {
	const context = useContext(CommandSearchContext)
	if (!context) {
		throw new Error(
			"useCommandSearchContext must be used within a CommandSearchProvider"
		)
	}
	return context
}
