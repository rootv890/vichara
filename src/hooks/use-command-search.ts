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
}

export const useCommandSearch = ({
	actions = [],
	groups = [],
	shortcuts = {},
	defaultOpen = false,
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
	}
}

export default useCommandSearch
