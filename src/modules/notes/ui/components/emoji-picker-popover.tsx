"use client"
import { isNoteHeaderToolbarVisibleAtom } from "@/modules/atoms"
import { Button, Popover, Portal } from "@chakra-ui/react"
import EmojiPicker from "emoji-picker-react"
import { useSetAtom } from "jotai/react"
import React, { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"

interface EmojiPickerPopoverProps {
	onEmojiSelect?: (emojiData: any) => void
	triggerButtonProps?: {
		size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "2xs"
		variant?: "ghost" | "outline" | "solid" | "subtle" | "surface" | "plain"
		fontSize?: string
		color?: string
	}
	triggerText?: string
}

const EmojiPickerPopover = ({
	onEmojiSelect,
	triggerButtonProps = {
		size: "xs",
		variant: "ghost",
		fontSize: "xs",
		color: "fg.subtle",
	},
	triggerText = "Add Icon",
}: EmojiPickerPopoverProps) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const setIsToolbarVisible = useSetAtom(isNoteHeaderToolbarVisibleAtom)

	// Keep toolbar visible when popover is open
	useEffect(() => {
		if (isPopoverOpen) {
			setIsToolbarVisible(true)
		}
	}, [isPopoverOpen, setIsToolbarVisible])

	const handleEmojiSelect = (emojiData: any) => {
		// Call the parent callback if provided
		onEmojiSelect?.(emojiData)

		// Close the popover after emoji selection
		setIsPopoverOpen(false)
	}

	return (
		<Popover.Root
			open={isPopoverOpen}
			onOpenChange={(details) => setIsPopoverOpen(details.open)}
		>
			<Popover.Trigger asChild>
				<Button
					size={triggerButtonProps.size}
					variant={triggerButtonProps.variant}
					fontSize={triggerButtonProps.fontSize}
					color={triggerButtonProps.color}
				>
					<IoMdAdd className="size-2.5" />
					{triggerText}
				</Button>
			</Popover.Trigger>
			<Portal>
				<Popover.Positioner>
					<Popover.Content>
						<Popover.Arrow />
						<Popover.Body p={0}>
							<EmojiPicker
								onEmojiClick={handleEmojiSelect}
								width={350}
								height={400}
								searchDisabled={false}
							/>
						</Popover.Body>
					</Popover.Content>
				</Popover.Positioner>
			</Portal>
		</Popover.Root>
	)
}

export default EmojiPickerPopover
