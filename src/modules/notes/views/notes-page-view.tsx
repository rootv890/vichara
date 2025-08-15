"use client"

import { BouncyLoading } from "@/components/loadings"
import { organizationIdAtom } from "@/modules/atoms/atoms"
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
import { useAtomValue, useSetAtom } from "jotai/react"
import Image from "next/image"
import React from "react"
import { toast } from "react-hot-toast"
import { LuCheck, LuPlus } from "react-icons/lu"
import { useCreateNote } from "../hooks/use-create-note"

type Props = {}

export const NotesPageView = ({}: Props) => {
	const { user } = useUser()
	const { organization } = useClerk()
	const { createNote, isLoading, error } = useCreateNote()

	// jotai hooks
	const organizationIdFromAtom = useAtomValue(organizationIdAtom)
	const setOrganizationId = useSetAtom(organizationIdAtom)
	const validateOrganization = useAction(api.organizations.validate)

	React.useEffect(() => {
		if (!organization) {
			setOrganizationId(null)
			return
		}

		const organizationId = organization.id

		validateOrganization({ organizationId })
			.then((result) => {
				if (!result.valid) {
					console.error("Organization validation failed:", result)
					toast.error(result.reason || "Organization validation failed")
					setOrganizationId(null)
				} else {
					setOrganizationId(organizationId)
				}
			})
			.catch((error) => {
				toast.error("Failed to validate organization: " + error.message)
				setOrganizationId(null)
			})
	}, [organization, validateOrganization, setOrganizationId])

	// Handle create Note
	const handleCreateNote = async () => {
		if (!user || !organizationIdFromAtom) {
			toast.error("User or organization not found")
			return
		}
		toast.promise(
			// @ts-ignore will fix
			createNote({
				title: "New Note",
				userId: user.id,
				organizationId: organizationIdFromAtom,
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
