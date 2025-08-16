"use client"
import { format, formatRelative, subDays } from "date-fns"
import React from "react"

import { BouncyLoading } from "@/components/loadings"
import { DestructiveButton } from "@/components/ui/button"
import { processNoteIcon, toRelative } from "@/lib/utils"
import {
	ActionBar,
	Button,
	Checkbox,
	Container,
	Heading,
	Portal,
	Table,
	Text,
	VStack,
} from "@chakra-ui/react"
import { api } from "@convex/_generated/api"

import { Id } from "@convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import Image from "next/image"
import { LuArchiveRestore, LuTrash2 } from "react-icons/lu"
type Props = {}

const TrashList = (props: Props) => {
	const [selection, setSelection] = React.useState<string[]>([])
	const items = useQuery(api.notes.getTrash)
	const [isLoading, setIsLoading] = React.useState<{
		delete: boolean
		restore: boolean
	}>({
		delete: false,
		restore: false,
	})
	const deleteNoteMutation = useMutation(api.notes.deleteNotePermanently)
	const restoreNoteMutation = useMutation(api.notes.restoreFromTrash)

	if (items === undefined)
		return (
			<BouncyLoading
				takeFullScreen
				label="Loading Table"
			/>
		)

	const hasSelection = selection.length > 0
	const indeterminate = selection.length > 0 && selection.length < items.length

	const deleteNotes = async () => {
		setIsLoading((prev) => ({
			...prev,
			delete: true,
		}))
		try {
			await Promise.all(
				selection.map(async (noteId) => {
					await deleteNoteMutation({ id: noteId as Id<"notes"> })
				})
			)
			setSelection([]) // Clear selection after successful deletion
		} catch (error) {
			console.error("Error deleting notes:", error)
		} finally {
			setIsLoading((prev) => ({
				...prev,
				delete: false,
			}))
		}
	}
	const restoreNotes = async () => {
		setIsLoading((prev) => ({
			...prev,
			restore: true,
		}))
		try {
			await Promise.all(
				selection.map(async (noteId) => {
					await restoreNoteMutation({ id: noteId as Id<"notes"> })
				})
			)
			setSelection([]) // Clear selection after successful restoration
		} catch (error) {
			console.error("Error restoring notes:", error)
		} finally {
			setIsLoading((prev) => ({
				...prev,
				restore: false,
			}))
		}
	}

	const rows = items.map((item) => (
		<Table.Row
			key={item._id}
			data-selected={selection.includes(item._id) ? "" : undefined}
		>
			<Table.Cell>
				<Checkbox.Root
					size={"sm"}
					top={0.5}
					aria-label="select note"
					checked={selection.includes(item._id)}
					onCheckedChange={(changes) => {
						setSelection(
							(prev) =>
								changes.checked
									? [...prev, item._id] // add
									: prev.filter((id) => id !== item._id) // remove
						)
					}}
				>
					<Checkbox.HiddenInput />
					<Checkbox.Control />
				</Checkbox.Root>
			</Table.Cell>
			<Table.Cell
				dangerouslySetInnerHTML={{ __html: processNoteIcon(item.icon) }}
			/>
			<Table.Cell>{item.title}</Table.Cell>
			<Table.Cell className="">{toRelative(item._creationTime)}</Table.Cell>
			<Table.Cell className="">
				{toRelative(item.archivedAt ?? "N/A")}
			</Table.Cell>
		</Table.Row>
	))

	const header = (
		<Table.Header
			fontWeight={"bold"}
			fontSize={"md"}
		>
			<Table.Row>
				<Table.ColumnHeader w="3">
					<Checkbox.Root
						size="sm"
						top="0.5"
						aria-label="Select all rows"
						checked={indeterminate ? "indeterminate" : selection.length > 0}
						onCheckedChange={(changes) => {
							// select all
							setSelection(changes.checked ? items.map((item) => item._id) : [])
						}}
					>
						<Checkbox.HiddenInput />
						<Checkbox.Control />
					</Checkbox.Root>
				</Table.ColumnHeader>
				<Table.ColumnHeader>Icon</Table.ColumnHeader>
				<Table.ColumnHeader>Title</Table.ColumnHeader>
				<Table.ColumnHeader>Last Modified</Table.ColumnHeader>
				<Table.ColumnHeader>Archived At</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
	)

	// show no deletes Ayay!
	if (items.length === 0) {
		return (
			<Table.Root>
				{header}
				<Table.Row>
					<Table.Cell
						colSpan={5}
						textAlign="center"
						h={"full"}
						py={20}
					>
						<VStack>
							<Image
								src="/illustrations/empty-table.svg"
								alt="No deleted notes"
								width={200}
								height={200}
							/>
							<Heading
								mt={8}
								fontSize={"xl"}
								w={"1/2"}
							>
								Hurray!!! No deleted notes found.
							</Heading>
						</VStack>
					</Table.Cell>
				</Table.Row>
			</Table.Root>
		)
	}

	return (
		<Container rounded={"lg"}>
			<Table.Root
				size="sm"
				variant="line"
				interactive
				stickyHeader
				striped
				showColumnBorder
				rounded={"lg"}
			>
				{header}
				<Table.Body>{rows}</Table.Body>
			</Table.Root>

			{/* Action Bar */}
			<ActionBar.Root open={hasSelection}>
				<Portal>
					<ActionBar.Positioner>
						<ActionBar.Content>
							<ActionBar.SelectionTrigger
								color={"fg"}
								bg={"bg"}
							>
								{selection.length} selected
							</ActionBar.SelectionTrigger>
							<ActionBar.Separator />
							<DestructiveButton
								variant="outline"
								border={"1px solid"}
								borderColor={"red.fg"}
								color={"red.fg"}
								size="sm"
								onClick={deleteNotes}
								loading={isLoading["delete"]}
								loadingText="Deleting..."
							>
								Delete <LuTrash2 />
							</DestructiveButton>
							<Button
								variant="surface"
								size="sm"
								onClick={restoreNotes}
								loading={isLoading["restore"]}
								loadingText="Restoring..."
							>
								Restore <LuArchiveRestore />
							</Button>
						</ActionBar.Content>
					</ActionBar.Positioner>
				</Portal>
			</ActionBar.Root>
		</Container>
	)
}

export default TrashList
