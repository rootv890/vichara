"use client"

import { CommandSearch } from "@/components/ui/command-search"
import { useCommandSearchContext } from "../../contexts/command-search-context"

export const CommandMenu = () => {
	const {
		open,
		setOpen,
		actions,
		groups,
		shortcuts,
		search,
		setSearch,
		isSearching,
		hasSearchResults,
	} = useCommandSearchContext()

	return (
		<CommandSearch
			open={open}
			onOpenChange={setOpen}
			placeholder="Type a command or search notes..."
			actions={actions}
			groups={groups}
			shortcuts={shortcuts}
			search={search}
			setSearch={setSearch}
			isSearching={isSearching}
			hasSearchResults={hasSearchResults}
		/>
	)
}
