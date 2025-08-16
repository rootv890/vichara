"use client"
import { BouncyLoading, CardioLoading } from "@/components/loadings"
import { expandedNotesAtom, isSidebarCollapsed } from "@/modules/atoms/atoms"
import { Box, Button, Collapsible, Flex, For, VStack } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { Doc, Id } from "@convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useAtom, useAtomValue, useSetAtom } from "jotai/react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
import { FaHistory } from "react-icons/fa"
import { GoTriangleRight } from "react-icons/go"
import NoteSidebarItem, { EmptyNoteSidebarItem } from "./note-sidebar-item"

type Props = {
	level?: number
	parentNoteId?: Id<"notes">
}

const SidebarList = ({ level = 0, parentNoteId }: Props) => {
	const isCollapsed = useAtomValue(isSidebarCollapsed)
	const router = useRouter()
	const pathname = usePathname()

	// const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})
	const expanded = useAtomValue(expandedNotesAtom)
	const setExpanded = useSetAtom(expandedNotesAtom)

	const onExpand = (noteId: string) => {
		setExpanded((prevExp) => {
			const newExpanded = {
				...prevExp,
				[noteId]: prevExp[noteId] === undefined ? true : !prevExp[noteId],
			}

			return newExpanded
		})
	}

	const notes = useQuery(api.notes.getAll, {
		parentNote: parentNoteId,
	})

	if (notes === undefined) {
		return <CardioLoading label="Loading notes bro..." />
	}

	// If this is a recursive call (level > 0), don't show the collapsible wrapper
	if (level > 0) {
		return (
			<VStack
				className="w-full"
				align="stretch"
				gap={0.5}
				ml={2} // Indent child notes
			>
				<For
					each={notes}
					fallback={null}
				>
					{(item, index) => (
						<Box key={item._id}>
							<NoteSidebarItem
								note={item}
								onExpand={() => onExpand(item._id)}
								expanded={expanded[item._id]}
								level={level}
							/>
							{expanded[item._id] && (
								<SidebarList
									level={level + 1}
									parentNoteId={item._id}
								/>
							)}
						</Box>
					)}
				</For>
			</VStack>
		)
	}

	// Top level component with collapsible wrapper
	return (
		<VStack
			className="w-full"
			align="stretch"
			gap={0}
			flex={"1"}
			overflowY={"auto"}
		>
			<Collapsible.Root defaultOpen={true}>
				<Collapsible.Trigger asChild>
					<Button
						variant="ghost"
						size="sm"
						justifyContent="space-between"
						w="full"
						color="gray.fg"
						fontWeight="medium"
						px={2}
						py={1}
					>
						<Flex
							justify={"start"}
							alignItems={"center"}
							gap={2}
						>
							<FaHistory />
							{isCollapsed ? null : "Recent Notes"}
						</Flex>
						<GoTriangleRight />
					</Button>
				</Collapsible.Trigger>
				<Collapsible.Content>
					<VStack
						className="w-full h-full"
						align="stretch"
						gap={0.5}
					>
						<For
							each={notes}
							fallback={<EmptyNoteSidebarItem />}
						>
							{(item, index) => (
								<Box key={item._id}>
									<NoteSidebarItem
										note={item}
										onExpand={() => onExpand(item._id)}
										expanded={expanded[item._id]}
										level={level}
									/>
									{expanded[item._id] && (
										<SidebarList
											level={level + 1}
											parentNoteId={item._id}
										/>
									)}
								</Box>
							)}
						</For>
					</VStack>
				</Collapsible.Content>
			</Collapsible.Root>
		</VStack>
	)
}

export default SidebarList
