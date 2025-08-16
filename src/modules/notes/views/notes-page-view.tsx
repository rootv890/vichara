"use client"

import { BouncyLoading } from "@/components/loadings"
import { useOrganization } from "@/modules/atoms"
import {
	Box,
	Button,
	Card,
	Heading,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/react"
import { useClerk, useUser } from "@clerk/nextjs"
import { api } from "@convex/_generated/api"
import { useAction, useMutation, useQuery } from "convex/react"
import Image from "next/image"
import React from "react"
import { toast } from "react-hot-toast"
import { LuCheck, LuPlus } from "react-icons/lu"
import { useCreateNote } from "../hooks/use-create-note"

type Props = {}

export const NotesPageView = ({}: Props) => {
	const { user } = useUser()
	const { organizationId } = useOrganization()
	const { createNote, isLoading, error } = useCreateNote()

	// Handle create Note
	const handleCreateNote = async () => {
		if (!user || !organizationId) {
			toast.error("User or organization not found")
			return
		}
		toast.promise(
			// @ts-ignore will fix
			createNote({
				title: "New Note",
			}),
			{
				loading: "Creating note...",
				success: () => {
					return "Note created successfully!"
				},
				error: (err) => {
					return `Error creating note: ${err.message}`
				},
			}
		)
	}

	// const allNotes = useQuery(
	// 	api.notes.getAll,
	// 	organizationIdFromAtom && user?.id
	// 		? { userId: user.id, organizationId: organizationIdFromAtom }
	// 		: "skip"
	// )

	return (
		<Box
			p={6}
			w={"full"}
			h={"full"}
		>
			<VStack
				gap={6}
				align="center"
				color={"fg"}
				justify="center"
				textAlign="center"
				w={"full"}
				h={"full"}
			>
				<Image
					width={300}
					height={300}
					src={"/illustrations/empty.svg"}
					alt="Empty State Illustration"
				/>

				<Heading as={"h3"}>Hey 👋 {user?.username}, Welcome to Vichara</Heading>
				<HStack>
					<Button
						onClick={handleCreateNote}
						disabled={isLoading}
					>
						{isLoading ? <BouncyLoading /> : "Create Note"}
						<LuPlus />
					</Button>
				</HStack>
			</VStack>
		</Box>
	)
}
