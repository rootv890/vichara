"use client"

import { CommandSearch } from "@/components/ui/command-search"
import { useCommandSearchContext } from "../../contexts/command-search-context"

export const CommandMenu = () => {
	const { open, setOpen, actions, groups, shortcuts } =
		useCommandSearchContext()

	return (
		<CommandSearch
			open={open}
			onOpenChange={setOpen}
			placeholder="Type a command or search..."
			actions={actions}
			groups={groups}
			shortcuts={shortcuts}
		/>
	)
}
