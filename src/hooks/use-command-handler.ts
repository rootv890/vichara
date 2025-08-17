/**
 * Custom hook for managing command search/command palette functionality.
 * Provides state management and actions for opening/closing a command menu,
 * along with configuration for actions, groups, and keyboard shortcuts.
 */

import { CommandAction, CommandGroup } from "@/components/ui/command-search"
import { useCallback, useState } from "react"

export interface UseCommandSearchProps {
	/**
	 * Actions that appear at the top of the command menu
	 */
	actions?: CommandAction[]
	/**
	 * Groups of items to display in the command menu
	 */
	groups?: CommandGroup[]
	/**
	 * Custom keyboard shortcuts to handle when the menu is open
	 */
	shortcuts?: Record<string, () => void | Promise<void>>
	/**
	 * Initial open state
	 */
	defaultOpen?: boolean
	/**
	 * External search state (optional)
	 */
	search?: string
	/**
	 * External search state setter (optional)
	 */
	setSearch?: (search: string) => void
	/**
	 * Whether a search is currently in progress
	 */
	isSearching?: boolean
	/**
	 * Whether the search has results
	 */
	hasSearchResults?: boolean
}

export const useSearchCommandHandler = ({
	actions = [],
	groups = [],
	shortcuts = {},
	defaultOpen = false,
	search: externalSearch,
	setSearch: externalSetSearch,
	isSearching,
	hasSearchResults,
}: UseCommandSearchProps = {}) => {
	const [open, setOpen] = useState(defaultOpen)

	const toggle = useCallback(() => {
		setOpen((prev) => !prev)
	}, [])

	const close = useCallback(() => {
		setOpen(false)
	}, [])

	const openMenu = useCallback(() => {
		setOpen(true)
	}, [])

	return {
		open,
		setOpen,
		toggle,
		close,
		openMenu,
		actions,
		groups,
		shortcuts,
		search: externalSearch,
		setSearch: externalSetSearch,
		isSearching,
		hasSearchResults,
	}
}

export default useSearchCommandHandler
