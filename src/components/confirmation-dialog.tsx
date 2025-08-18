import { Button, Dialog, Mark, Portal, Text } from "@chakra-ui/react"
import React from "react"
import { CloseButton } from "./ui/close-button"

type Props = {
	id: string
	header: string
	body?: React.ReactNode
	functionToRun?: () => void
	placement?: "top" | "bottom" | "center"
	confirmLabel: string
	confirmOpen: boolean
	setConfirmOpen: (value: boolean) => void
	isLoading?: boolean
	setIsLoading?: (value: boolean) => void
	colorPalette?:
		| "border"
		| "bg"
		| "current"
		| `var(--${string})`
		| "transparent"
		| "black"
		| "white"
		| "fg"
		| "blue"
		| "cyan"
		| "gray"
		| "green"
		| "orange"
		| "pink"
		| "purple"
		| "red"
		| "teal"
		| "yellow"
		| "whiteAlpha"
		| "blackAlpha"
}

const ConfirmationDialog = ({
	id,
	header,
	body,
	confirmOpen,
	functionToRun,
	placement,
	setConfirmOpen,
	confirmLabel,
	isLoading,
	colorPalette = "red",
}: Props) => {
	return (
		<Dialog.Root
			open={confirmOpen}
			onOpenChange={(e) => setConfirmOpen(e.open)}
			role="alertdialog"
			placement={placement}
			motionPreset="slide-in-bottom"
			size={"sm"}
			id={id}
		>
			<Portal>
				<Dialog.Positioner>
					<Dialog.Content
						bg={"bg"}
						color={"fg"}
						rounded="lg"
						boxShadow={"md"}
						border={"2px solid"}
						borderColor={"fg"}
					>
						<Dialog.Header
							fontWeight="bold"
							fontSize={"xl"}
						>
							{header}
						</Dialog.Header>
						{body && <Dialog.Body>{body}</Dialog.Body>}

						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button
									onClick={() => setConfirmOpen(false)}
									variant="outline"
								>
									Cancel
								</Button>
							</Dialog.ActionTrigger>
							<Button
								colorPalette={colorPalette}
								bg={"colorPalette.300"}
								color={"colorPalette.fg"}
								onClick={() => {
									functionToRun?.()
									setConfirmOpen(false)
								}}
								loading={isLoading}
								loadingText="processing..."
							>
								{confirmLabel}
							</Button>
						</Dialog.Footer>

						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}

export default ConfirmationDialog

export const DeleteDialog = ({
	noteId,
	onDelete,
	confirmDelete = false,
	setConfirmDelete,
}: {
	noteId: string
	onDelete?: () => void
	confirmDelete: boolean
	setConfirmDelete: (value: boolean) => void
}) => {
	return (
		<ConfirmationDialog
			id={`delete-note-${noteId}`}
			header="Confirm Delete"
			body={
				<Text>
					Are you sure you want to delete this note?
					<Mark
						colorPalette="red"
						bg={"colorPalette.300"}
						color={"colorPalette.fg"}
					>
						{" "}
						This action cannot be undone.
					</Mark>
				</Text>
			}
			confirmLabel="Delete"
			confirmOpen={confirmDelete}
			setConfirmOpen={setConfirmDelete}
			functionToRun={onDelete}
		/>
	)
}

export const RestoreDialog = ({
	noteId,
	onRestore,
	confirmRestore,
	setConfirmRestore,
}: {
	noteId: string
	onRestore?: () => void
	confirmRestore: boolean
	setConfirmRestore: (value: boolean) => void
}) => {
	return (
		<ConfirmationDialog
			id={`restore-note-${noteId}`}
			header="Confirm Restore"
			colorPalette="green"
			body={
				<Text>
					Are you sure you want to restore this note?
					<Mark
						colorPalette="green"
						bg={"colorPalette.300"}
						color={"colorPalette.fg"}
					>
						All children (If any) will be restored as well.
					</Mark>
				</Text>
			}
			confirmLabel="Restore"
			confirmOpen={confirmRestore}
			setConfirmOpen={setConfirmRestore}
			functionToRun={onRestore}
		/>
	)
}
