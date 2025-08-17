import { useColorMode } from "@/components/ui/color-mode"
import {
	CommandAction,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command-search"
import { useSearchCommandHandler } from "@/hooks/use-command-handler"
import { processNoteIcon } from "@/lib/utils"
import { persistantCounter } from "@/modules/atoms"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import { useRouter } from "next/navigation"
import React, { createElement, useCallback } from "react"
import toast from "react-hot-toast"
import { LuMoon, LuPlus, LuSettings, LuSun, LuTrash2 } from "react-icons/lu"
import { useCreateNote } from "./use-create-note"

export const useNotesCommandSearch = () => {
	const [search, setSearch] = React.useState("")
	const [debouncedSearch, setDebouncedSearch] = React.useState(search)

	const router = useRouter()
	const { createNotePromise } = useCreateNote()
	const persistantCounterNum = useAtomValue(persistantCounter)
	const setPersistantCounter = useSetAtom(persistantCounter)
	const { colorMode, setColorMode } = useColorMode()

	// Track if we're currently searching (search !== debouncedSearch)
	const isSearching = search !== debouncedSearch && search.trim() !== ""

	// debounce
	React.useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search)
		}, 300)

		return () => {
			clearTimeout(handler)
		}
	}, [search])

	// Get data
	const notes =
		useQuery(api.notes.searchNotes2, {
			search: debouncedSearch,
		}) ?? []
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
		// Add create note with search title if searching and no results
		...(search.trim() !== "" && !isSearching && notes.length === 0
			? [
					{
						id: "create-note-with-title",
						label: `Create note "${search.trim()}"`,
						icon: LuPlus,
						action: async () => {
							setPersistantCounter(persistantCounterNum + 1)
							try {
								const newNoteId = await toast.promise(
									createNotePromise({
										title: search.trim(),
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
						},
					},
			  ]
			: []),
		{
			id: "trash",
			label: "Open Trash",
			// shortcut: ,
			icon: LuTrash2,
			action: () => router.push("/notes/trash"),
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

	// Don't show any results while searching
	if (isSearching) {
		// Show nothing while searching - the component will handle loading state
	} else {
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
				id: "notes",
				label: "Notes",
				items: noteItems,
			})
		}

		// Trash Group - only show if not actively searching for notes
		if (trashedNotes.length > 0 && search.trim() === "") {
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
				// Recent trashed notes (limit to 3 for command menu)
				...trashedNotes.slice(0, 3).map((note) => ({
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
	}

	return useSearchCommandHandler({
		actions,
		groups,
		shortcuts,
		search,
		setSearch,
		isSearching,
		hasSearchResults: !isSearching && search.trim() !== "" && notes.length > 0,
	})
}

export default useNotesCommandSearch
