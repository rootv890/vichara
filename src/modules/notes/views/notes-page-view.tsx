"use client"

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

type Props = {}

export const NotesPageView = ({}: Props) => {
	const { user } = useUser()
	const { organization } = useClerk()

	// jotai hooks
	const organizationIdFromAtom = useAtomValue(organizationIdAtom)
	const setOrganizationId = useSetAtom(organizationIdAtom)
	const validateOrganization = useAction(api.organizations.validate)
	const createNewNote = useMutation(api.notes.create)
	const [loading, setLoading] = React.useState(false)

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
		setLoading(true)

		try {
			const promise = createNewNote({
				title: `New Note ${Math.random().toFixed(4)}`,
				organizationId: organizationIdFromAtom!,
				userId: user?.id!,
			})
			toast.promise(
				promise,
				{
					loading: "Creating Note...",
					success: "Note created successfully!",
					error: "Failed to create note",
				},
				{
					style: {
						background: "var(--chakra-colors-bg-emphasized)",
						color: "var(--chakra-colors-fg)",
						borderRadius: "8px",
						padding: "8px 16px !important",
					},
				}
			)
		} catch (error) {}
		setLoading(false)
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
					<Button onClick={handleCreateNote}>
						Create Note @ {organizationIdFromAtom}
						<LuPlus />
					</Button>
				</HStack>
			</VStack>
		</Box>
	)
}
