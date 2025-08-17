"use client"
import { BouncyLoading, CardioLoading } from "@/components/loadings"
import { expandedNotesAtom, isSidebarCollapsed } from "@/modules/atoms/atoms"
import { Box, Button, Collapsible, Flex, For, VStack } from "@chakra-ui/react"
import { api } from "@convex/_generated/api"
import { Id } from "@convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useAtomValue, useSetAtom } from "jotai/react"

import { Bouncy } from "ldrs/react"
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

	console.log("SidebarList notes:", notes?.length)

	if (notes === undefined) {
		return <BouncyLoading label="Loading notes bro..." />
	}

	// If this is a recursive call (level > 0), don't show the collapsible wrapper
	if (level > 0) {
		return (
			<VStack
				className="w-full"
				align="stretch"
				gap={0.5}
				ml={4} // Indent child notes
				w="full"
			>
				<For
					each={notes}
					fallback={null}
				>
					{(item, _i) => (
						<React.Fragment key={item._id}>
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
						</React.Fragment>
					)}
				</For>
			</VStack>
		)
	}

	// Top level component with collapsible wrapper
	return (
		<VStack
			w="full"
			align="start"
			gap={0}
			h="full" // Take full height of parent container
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
						flexShrink={0} // Don't shrink the trigger button
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
					flex="1"
					minH={0} // Important: allows content to shrink below its natural size
					w="full"
				>
					{/* This is now the scrollable container */}
					<VStack
						className="w-full"
						align="stretch"
						gap={0.5}
						pos={"relative"}
						w="full"
						h="full"
					>
						<For
							each={notes}
							fallback={<EmptyNoteSidebarItem />}
						>
							{(item, index) => (
								<React.Fragment key={item._id}>
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
								</React.Fragment>
							)}
						</For>
					</VStack>
				</Collapsible.Content>
			</Collapsible.Root>
		</VStack>
	)
}

export default SidebarList
