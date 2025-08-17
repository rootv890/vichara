import { useColorMode } from "@/components/ui/color-mode"
import {
	CommandAction,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command-search"
import { useCommandSearch } from "@/hooks/use-command-search"
import { processNoteIcon } from "@/lib/utils"
import { persistantCounter } from "@/modules/atoms"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import { useRouter } from "next/navigation"
import { createElement, useCallback } from "react"
import toast from "react-hot-toast"
import { LuMoon, LuPlus, LuSettings, LuSun, LuTrash2 } from "react-icons/lu"
import { useCreateNote } from "./use-create-note"

export const useNotesCommandSearch = () => {
	const router = useRouter()
	const { createNotePromise } = useCreateNote()
	const persistantCounterNum = useAtomValue(persistantCounter)
	const setPersistantCounter = useSetAtom(persistantCounter)
	const { colorMode, setColorMode } = useColorMode()

	// Get data
	const notes = useQuery(api.notes.getAll, {}) ?? []
	const trashedNotes = useQuery(api.notes.getTrash) ?? []

	const handleCreateNote = useCallback(async () => {
		setPersistantCounter(persistantCounterNum + 1)

		try {
			const newNoteId = await toast.promise(
				createNotePromise({
					title: `New Note ${persistantCounterNum}`,
				}),
				{
					loading: "Creating note...",
					success: "Note created!",
					error: (err) => `Error creating note: ${err.message}`,
				}
			)
			router.push(`/notes/${newNoteId}`)
		} catch (error) {
			console.error("Failed to create note:", error)
		}
	}, [createNotePromise, persistantCounterNum, setPersistantCounter, router])

	// Define actions
	const actions: CommandAction[] = [
		{
			id: "new-note",
			label: "Create New Note",
			icon: LuPlus,
			shortcut: "N",
			action: handleCreateNote,
		},
		{
			id: "settings",
			label: "Open Settings",
			icon: LuSettings,
			action: () => {
				router.push("/settings")
			},
		},
		// theme swithcing
		{
			id: "theme toggle",
			label: "Toggle Theme",
			shortcut: "T",
			icon: colorMode === "light" ? LuSun : LuMoon,
			action: () => {
				setColorMode(colorMode === "light" ? "dark" : "light")
			},
		},
	]

	// Define shortcuts
	const shortcuts = {
		n: handleCreateNote,
		// theme
		t: () => {
			setColorMode(colorMode === "light" ? "dark" : "light")
		},
	}

	// Create groups
	const groups: CommandGroup[] = []

	// Notes Group
	if (notes.length > 0) {
		const noteItems: CommandItem[] = notes.slice(0, 8).map((note) => ({
			id: note._id,
			title: note.title || "Untitled",
			subtitle: "Note",
			icon: processNoteIcon(note.icon),
			route: `/notes/${note._id}`,
		}))

		groups.push({
			id: "recent-notes",
			label: "Recent Notes",
			items: noteItems,
		})
	}

	// Trash Group
	if (trashedNotes.length > 0) {
		const trashItems: CommandItem[] = [
			// Trash overview item
			{
				id: "open-trash",
				title: "Open Trash",
				subtitle: `${trashedNotes.length} deleted note${
					trashedNotes.length !== 1 ? "s" : ""
				}`,
				icon: createElement(LuTrash2, { size: 16, color: "red.500" }),
				route: "/notes/trash",
			},
			// Recent trashed notes
			...trashedNotes.slice(0, 10).map((note) => ({
				id: `trash-${note._id}`,
				title: note.title || "Untitled",
				subtitle: "Deleted note",
				icon: processNoteIcon(note.icon),
				route: "/notes/trash",
				metadata: {
					isDeleted: true,
					originalIcon: note.icon,
				},
			})),
		]

		groups.push({
			id: "trash",
			label: "Trash",
			items: trashItems,
		})
	}

	return useCommandSearch({
		actions,
		groups,
		shortcuts,
	})
}

export default useNotesCommandSearch
