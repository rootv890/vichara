"use client"

import { CommandSearch } from "@/components/ui/command-search"
import { useTrashCommandSearch } from "../../hooks/use-trash-command-search"

export const TrashCommandMenu = () => {
	const { open, setOpen, actions, groups, shortcuts } = useTrashCommandSearch()

	return (
		<CommandSearch
			open={open}
			onOpenChange={setOpen}
			placeholder="Search trash or type a command..."
			actions={actions}
			groups={groups}
			shortcuts={shortcuts}
			emptyMessage="No deleted notes found"
		/>
	)
}

export default TrashCommandMenu
