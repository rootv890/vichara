"use client"

import { currentActiveNoteIdAtom, persistantCounter } from "@/modules/atoms"
import { Button, Menu, Portal } from "@chakra-ui/react"
import { Id } from "@convex/_generated/dataModel"
import { useAtomValue, useSetAtom } from "jotai/react"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import {
	LuChevronRight,
	LuCornerDownRight,
	LuEllipsis,
	LuPlus,
} from "react-icons/lu"
import { useCreateNote } from "../../hooks/use-create-note"
import useNoteDuplication from "../../hooks/use-note-duplication"

const NavMenu = () => {
	const { createNotePromise } = useCreateNote()
	const noteId = useAtomValue(currentActiveNoteIdAtom) as Id<"notes">
	const persistantCounterNum = useAtomValue(persistantCounter)
	const setPersistantCounter = useSetAtom(persistantCounter)
	const router = useRouter()
	const { duplicateNote } = useNoteDuplication()

	function handleNewNote(type: "new-note" | "new-child-note" = "new-note") {
		const nextCounter = persistantCounterNum + 1
		setPersistantCounter(nextCounter)

		// build note payload
		const noteData: any = {
			title: `New Note ${nextCounter}`,
			...(noteId && type === "new-child-note" ? { parentNote: noteId } : {}),
		}

		// run promise with toast feedback
		toast
			.promise(createNotePromise(noteData), {
				loading: "Creating note...",
				success: "Note created!",
				error: (err) => `Error creating note: ${err.message}`,
			})
			.then((newNoteId) => {
				router.push(`/notes/${newNoteId}`)
			})
	}

	function handleDuplicateNote() {
		if (!noteId) {
			toast.error("No note selected to duplicate")
			return
		}
		toast(`noteId ${noteId}`)

		toast
			.promise(duplicateNote(noteId), {
				loading: "Duplicating note...",
				success: "Note duplicated!",
				error: (err) => `Error duplicating note: ${err.message}`,
			})
			.then((newNoteId) => {
				// console.log("New NoteID:", newNoteId)
				router.push(`/notes/${newNoteId}`)
			})
			.catch((error) => {
				toast.error(`Error duplicating note: ${error.message}`)
			})
	}

	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Menu.ContextTrigger asChild>
					<Button
						variant="subtle"
						size="sm"
						border={"1px solid var(--chakra-colors-border)"}
					>
						<LuEllipsis />
					</Button>
				</Menu.ContextTrigger>
			</Menu.Trigger>

			<Portal>
				<Menu.Positioner>
					<Menu.Content
						rounded={"xl"}
						bg={"bg.panel"}
						shadow={"md"}
					>
						{/* ---------------- 📝 Note Management ---------------- */}
						{/* DONE :  New Note -> Sub Menu -> New Note or Child Note */}

						<Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
							<Menu.TriggerItem rounded={"md"}>
								<LuPlus />
								New Note <LuChevronRight />
							</Menu.TriggerItem>
							<Portal>
								<Menu.Positioner>
									<Menu.Content
										rounded={"xl"}
										bg={"bg.panel"}
										shadow={"md"}
									>
										<MenuItem
											value="new-note"
											onClick={() => handleNewNote("new-note")}
										>
											<LuPlus />
											New Note
										</MenuItem>
										<MenuItem
											value="new-child-note"
											onClick={() => handleNewNote("new-child-note")}
										>
											<LuCornerDownRight />
											New Child Note
										</MenuItem>
									</Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu.Root>
						{/* TODO: Duplicate */}
						<MenuItem
							value="duplicate"
							onClick={() => handleDuplicateNote()}
						>
							<HiOutlineDocumentDuplicate />
							Duplicate Note
						</MenuItem>

						{/* TODO: Import */}
						{/* TODO: Export */}

						{/* ---------------- 🌐 Collaboration & Sharing ---------------- */}
						{/* TODO: Publish */}
						{/* TODO: Copy Link */}

						{/* ---------------- ⭐ Organization & Preferences ---------------- */}
						{/* TODO : Add to Fav */}
						{/* TODO: Lock Switch */}

						{/* ---------------- 🗑️ Destructive Actions ---------------- */}
						{/* TODO: Trash */}

						{/* ---------------- ℹ️ Metadata / Info ---------------- */}
						{/* TODO: Last edited and By */}
						{/* TODO: Word Counts */}
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	)
}

export default NavMenu

interface MenuItemProps
	extends React.ComponentPropsWithoutRef<typeof Menu.Item> {
	value: string
	asChild?: boolean
	functionToRun?: () => void
	children?: React.ReactNode
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
	({ value, asChild, children, ...props }, ref) => {
		return (
			<Menu.Item
				ref={ref}
				value={value}
				asChild={asChild}
				rounded="md"
				{...props}
			>
				{children || value}
			</Menu.Item>
		)
	}
)

MenuItem.displayName = "MenuItem"
