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

import { FaHistory } from "react-icons/fa"
import { GoTriangleRight } from "react-icons/go"
import NoteSidebarItem, { EmptyNoteSidebarItem } from "./note-sidebar-item"

type Props = {
	level?: number
	parentNoteId?: Id<"notes">
}

const SidebarList = ({ level = 0, parentNoteId }: Props) => {
	const isCollapsed = useAtomValue(isSidebarCollapsed)

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
				ml={4} // Indent child notes
			>
				<For
					each={notes}
					fallback={null}
				>
					{(item, _i) => (
						<>
							<NoteSidebarItem
								key={item._id}
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
						</>
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
			minH={0}
			overflowY={"auto"}
			overflowX={"hidden"}
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
				<Collapsible.Content
					display="flex"
					flexDir="column"
					h="full"
					minH={0}
					overflowX="hidden"
				>
					<Box
						className="scrollbar-x-hidden"
						overflowX="auto"
						w="full"
						h="full"
						flex={1}
					>
						<VStack
							className="w-full h-full"
							align="stretch"
							gap={0.5}
							pos={"relative"}
							minW="max-content"
						>
							<For
								each={notes}
								fallback={<EmptyNoteSidebarItem />}
							>
								{(item, index) => (
									<>
										<NoteSidebarItem
											key={item._id}
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
									</>
								)}
							</For>
						</VStack>
					</Box>
				</Collapsible.Content>
			</Collapsible.Root>
		</VStack>
	)
}

export default SidebarList
