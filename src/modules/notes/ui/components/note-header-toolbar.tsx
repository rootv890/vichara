"use client"
import { currentActiveNoteIdAtom } from "@/modules/atoms"
import { Button, Group, HStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai/react"
import React from "react"
import toast from "react-hot-toast"
import { BsChatSquareTextFill } from "react-icons/bs"
import { IoMdImage } from "react-icons/io"
import useUpdateNote from "../../hooks/use-update-note"
import EmojiPickerPopover from "./emoji-picker-popover"

type Props = {}

const NoteHeaderToolbar = (props: Props) => {
	const noteId = useAtomValue(currentActiveNoteIdAtom)
	const { updateNote } = useUpdateNote()

	const handleAddOrUpdateIcon = (emojiData: { emoji: string }) => {
		toast.promise(updateNote({ icon: emojiData.emoji }, noteId), {
			loading: "Updating icon...",
			success: "Icon updated successfully!",
			error: "Failed to update icon.",
		})
	}

	const handleEmojiSelect = (emojiData: any) => {
		// Handle emoji selection here
		console.log("Selected emoji:", emojiData.emoji)
		handleAddOrUpdateIcon(emojiData)
		// You can add your emoji handling logic here
	}

	return (
		<div>
			<Group
				alignItems={"flex-start"}
				w={"full"}
				attached
			>
				<EmojiPickerPopover onEmojiSelect={handleEmojiSelect} />

				<Button
					size={"xs"}
					variant={"ghost"}
					p={"2"}
					fontSize="xs"
					color={"fg.subtle"}
					border={"none"}
					gap={"1"}
				>
					<IoMdImage className="size-2.5" />
					Add Cover
				</Button>
				<Button
					size={"xs"}
					variant={"ghost"}
					p={"2"}
					fontSize="xs"
					color={"fg.subtle"}
					border={"none"}
				>
					<BsChatSquareTextFill className="size-2.5" />
					Add Comments
				</Button>
			</Group>
		</div>
	)
}

export default NoteHeaderToolbar
