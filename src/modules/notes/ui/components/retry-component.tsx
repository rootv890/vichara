"use client"

import {
	Box,
	Button,
	EmptyState,
	HStack,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import React from "react"
import { LuArrowLeft, LuRefreshCw, LuTriangle } from "react-icons/lu"
import { RiAlarmWarningFill } from "react-icons/ri"

interface RetryComponentProps {
	message?: string
	title?: string
	showNotesLink?: boolean
	onRetry?: () => void
	description?: string
}

const RetryComponent: React.FC<RetryComponentProps> = ({
	message = "Something went wrong. Please try again.",
	title = "Oops! Something went wrong",
	showNotesLink = true,
	onRetry,
	description,
}) => {
	const router = useRouter()

	const handleRetry = () => {
		if (onRetry) {
			onRetry()
		} else {
			window.location.reload()
		}
	}

	const handleGoToNotes = () => {
		router.push("/notes")
	}

	return (
		<Box
			w="full"
			h="full"
			display="flex"
			alignItems="center"
			justifyContent="center"
			py={16}
			px={6}
		>
			<EmptyState.Root
				maxW="md"
				textAlign="center"
			>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<Box
							bg="red.subtle"
							color="red.fg"
							p={4}
							borderRadius="full"
							display="inline-flex"
							alignItems="center"
							justifyContent="center"
						>
							<RiAlarmWarningFill size={24} />
						</Box>
					</EmptyState.Indicator>

					<VStack gap={3}>
						<EmptyState.Title
							fontSize="xl"
							fontWeight="semibold"
							color="fg"
						>
							{title}
						</EmptyState.Title>

						<EmptyState.Description
							color="fg.muted"
							fontSize="md"
							lineHeight="relaxed"
						>
							<Text>{message}</Text>
							{description && (
								<Box
									mt={2}
									fontSize="sm"
									color="fg.subtle"
								>
									<Text>{description}</Text>
								</Box>
							)}
						</EmptyState.Description>
					</VStack>

					<VStack
						gap={3}
						mt={6}
					>
						<Button
							onClick={handleRetry}
							colorPalette="blue"
							size="md"
							variant="solid"
							_hover={{
								transform: "translateY(-1px)",
								boxShadow: "md",
							}}
							transition="all 0.2s ease"
						>
							<LuRefreshCw size={16} />
							Try Again
						</Button>

						{showNotesLink && (
							<HStack
								gap={2}
								align="center"
							>
								<Box
									w="1px"
									h="4"
									bg="border.muted"
								/>
								<Box
									fontSize="sm"
									color="fg.muted"
								>
									or
								</Box>
								<Box
									w="1px"
									h="4"
									bg="border.muted"
								/>
							</HStack>
						)}

						{showNotesLink && (
							<Button
								onClick={handleGoToNotes}
								variant="ghost"
								size="sm"
								color="fg.muted"
								_hover={{
									color: "fg",
									bg: "bg.muted",
								}}
								transition="all 0.15s ease"
							>
								<LuArrowLeft size={14} />
								Go to Notes
							</Button>
						)}
					</VStack>
				</EmptyState.Content>
			</EmptyState.Root>
		</Box>
	)
}

export default RetryComponent

// Alternative compact version for inline use
export const InlineRetryComponent: React.FC<
	Omit<RetryComponentProps, "showNotesLink"> & { compact?: boolean }
> = ({ message = "Something went wrong", onRetry, compact = false }) => {
	const handleRetry = () => {
		if (onRetry) {
			onRetry()
		} else {
			window.location.reload()
		}
	}

	if (compact) {
		return (
			<HStack
				gap={3}
				p={3}
				bg="red.subtle"
				borderRadius="md"
				border="1px solid"
				borderColor="red.muted"
				align="center"
			>
				<LuTriangle
					size={16}
					color="var(--chakra-colors-red-fg)"
				/>
				<Box
					fontSize="sm"
					color="red.fg"
					flex="1"
				>
					{message}
				</Box>
				<Button
					onClick={handleRetry}
					size="xs"
					variant="outline"
					colorPalette="red"
				>
					<LuRefreshCw size={12} />
					Retry
				</Button>
			</HStack>
		)
	}

	return (
		<VStack
			gap={3}
			p={4}
			bg="bg.subtle"
			borderRadius="lg"
			border="1px solid"
			borderColor="border.muted"
			textAlign="center"
		>
			<HStack
				gap={2}
				align="center"
			>
				<LuTriangle
					size={18}
					color="var(--chakra-colors-red-fg)"
				/>
				<Box
					fontSize="sm"
					color="fg.muted"
				>
					{message}
				</Box>
			</HStack>
			<Button
				onClick={handleRetry}
				size="sm"
				variant="outline"
				_hover={{
					transform: "translateY(-1px)",
				}}
				transition="all 0.15s ease"
			>
				<LuRefreshCw size={14} />
				Try Again
			</Button>
		</VStack>
	)
}
