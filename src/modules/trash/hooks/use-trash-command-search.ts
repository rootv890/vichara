import {
	CommandAction,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command-search"
import { useSearchCommandHandler } from "@/hooks/use-command-handler"
import { processNoteIcon } from "@/lib/utils"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { LuRotateCcw, LuTrash2, LuUndo2 } from "react-icons/lu"

export const useTrashCommandSearch = () => {
	const router = useRouter()

	// Get data
	const trashedNotes = useQuery(api.notes.getTrash) ?? []
	const notes = useQuery(api.notes.getAll, {}) ?? []

	const handleGoToNotes = useCallback(() => {
		router.push("/notes")
	}, [router])

	const handleRestoreAll = useCallback(async () => {
		// This would need to be implemented in your API
		console.log("Restore all notes functionality would go here")
	}, [])

	const handleEmptyTrash = useCallback(async () => {
		// This would need to be implemented in your API
		console.log("Empty trash functionality would go here")
	}, [])

	// Define actions
	const actions: CommandAction[] = [
		{
			id: "go-to-notes",
			label: "Go to Notes",
			icon: LuUndo2,
			shortcut: "N",
			action: handleGoToNotes,
		},
		{
			id: "restore-all",
			label: "Restore All Notes",
			icon: LuRotateCcw,
			shortcut: "R",
			action: handleRestoreAll,
		},
		{
			id: "empty-trash",
			label: "Empty Trash",
			icon: LuTrash2,
			shortcut: "E",
			action: handleEmptyTrash,
		},
	]

	// Define shortcuts
	const shortcuts = {
		n: handleGoToNotes,
		r: handleRestoreAll,
		e: handleEmptyTrash,
	}

	// Create groups
	const groups: CommandGroup[] = []

	// Trashed Notes Group
	if (trashedNotes.length > 0) {
		const trashedItems: CommandItem[] = trashedNotes.map((note) => ({
			id: note._id,
			title: note.title || "Untitled",
			subtitle: `Deleted note`,
			icon: processNoteIcon(note.icon),
			action: () => {
				// This could open a restore dialog or preview
				console.log("Selected trashed note:", note._id)
			},
			metadata: {
				isDeleted: true,
				originalIcon: note.icon,
				archivedAt: note.archivedAt,
			},
		}))

		groups.push({
			id: "trashed-notes",
			label: "Deleted Notes",
			items: trashedItems,
		})
	}

	// Recent Notes Group (for quick navigation)
	if (notes.length > 0) {
		const recentItems: CommandItem[] = notes.slice(0, 5).map((note) => ({
			id: `recent-${note._id}`,
			title: note.title || "Untitled",
			subtitle: "Note",
			icon: processNoteIcon(note.icon),
			route: `/notes/${note._id}`,
		}))

		groups.push({
			id: "recent-notes",
			label: "Recent Notes",
			items: recentItems,
		})
	}

	return useSearchCommandHandler({
		actions,
		groups,
		shortcuts,
	})
}

export default useTrashCommandSearch
