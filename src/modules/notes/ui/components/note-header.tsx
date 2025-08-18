"use client"
// This components will have a icon and cover + toolbar in area when mouse in that header area

import { cn, processNoteIcon } from "@/lib/utils"
import {
	currentActiveNoteIdAtom,
	isNoteHeaderToolbarVisibleAtom,
} from "@/modules/atoms"
import { Box, Center, VStack } from "@chakra-ui/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import Image from "next/image"
import React, { useCallback, useRef } from "react"
import useFetchNotes from "../../hooks/use-fetch-notes"
import NoteHeaderToolbar from "./note-header-toolbar"

type Props = {}

const NoteHeader = (props: Props) => {
	const isToolbarVisible = useAtomValue(isNoteHeaderToolbarVisibleAtom)
	const setIsToolbarVisible = useSetAtom(isNoteHeaderToolbarVisibleAtom)
	// const currentActiveNoteId = useAtomValue(currentActiveNoteIdAtom)

	const { fetchedNote } = useFetchNotes()

	const containerRef = useRef<HTMLDivElement>(null)
	const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const handleMouseEnter = useCallback(() => {
		// Clear any pending hide timeout
		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current)
			hideTimeoutRef.current = null
		}
		setIsToolbarVisible(true)
	}, [setIsToolbarVisible])

	const handleMouseLeave = useCallback(() => {
		// Add a small delay before hiding to prevent flicker when moving between elements
		hideTimeoutRef.current = setTimeout(() => {
			setIsToolbarVisible(false)
		}, 100)
	}, [setIsToolbarVisible])

	// Cleanup timeout on unmount
	React.useEffect(() => {
		return () => {
			if (hideTimeoutRef.current) {
				clearTimeout(hideTimeoutRef.current)
			}
		}
	}, [])

	return (
		<VStack
			ref={containerRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			w={"full"}
		>
			<VStack
				pos={"relative"}
				bg={"transparent"}
				h={"30vh"}
				maxHeight={"280px"}
				bgImage={"url(/test.jpg)"}
				objectPosition={"center 20%"}
				bgPos={"center"}
				bgSize={"cover"}
				bgRepeat={"no-repeat"}
				objectFit={"cover"}
				w={"full"}
			>
				{/* icon container */}
				{fetchedNote?.icon && (
					<Box
						fontSize={"56px"}
						w={"76px"}
						h={"76px"}
						pos={"absolute"}
						bottom={"0"}
						transform={"translate(-50%, 50%)"}
						left={"25vh"}
						display={"flex"}
						// show the toolbar when mouse is over this area
						onMouseEnter={handleMouseEnter}
						// onMouseLeave={handleMouseLeave}
						onClick={() => {
							// show emoji picker
						}}
						dangerouslySetInnerHTML={{
							__html: processNoteIcon(fetchedNote.icon, "56"),
						}}
					></Box>
				)}
			</VStack>
			<div
				className={cn(
					"w-full max-w-2xl transition-opacity duration-200",
					isToolbarVisible ? "opacity-100" : "opacity-0 pointer-events-none"
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<NoteHeaderToolbar />
			</div>
		</VStack>
	)
}

export default NoteHeader
