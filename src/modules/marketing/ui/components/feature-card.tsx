"use client"
import { useColorMode } from "@/components/ui/color-mode"
import {
	Box,
	Card,
	Circle,
	Code,
	Heading,
	Icon,
	Skeleton,
	Stack,
	Tag,
	Text,
} from "@chakra-ui/react"
import { ReactElement } from "react"
import { IconType } from "react-icons"

interface FeatureCardProps {
	icon: IconType
	title: string
	description: string
	isLarge?: boolean
	showMockEditor?: boolean
	showSearchBox?: boolean
	showCollabAvatars?: boolean
	showTags?: boolean
	tags?: string[]
	gridColumn?: string | string[]
	gridRow?: string | string[]
	children?: ReactElement
}

export function FeatureCard({
	icon,
	title,
	description,
	isLarge = false,
	showMockEditor = false,
	showSearchBox = false,
	showCollabAvatars = false,
	showTags = false,
	tags = [],
	gridColumn,
	gridRow,
	children,
}: FeatureCardProps) {
	const { colorMode } = useColorMode()
	return (
		<Card.Root
			gridColumn={gridColumn}
			gridRow={gridRow}
			borderRadius="2xl"
			border="none"
			bg={colorMode === "dark" ? "bg.panel" : "bg.emphasized"}
			cursor={"pointer"}
			rounded="2xl"
			_hover={{
				bg: "bg.muted",
				transition: "background-color 0.2s ease-in-out",
			}}
		>
			<Card.Body
				p={isLarge ? 8 : 6}
				_hover={{ borderColor: "gray.300" }}
				transition="all 0.2s"
				h="full"
			>
				<Stack
					direction="column"
					align="start"
					h="full"
					gap={isLarge ? 6 : 4}
				>
					<Circle
						size={isLarge ? 10 : 8}
						bg="bg.inverted"
						color="fg.inverted"
					>
						<Icon
							as={icon}
							boxSize={isLarge ? 5 : 4}
						/>
					</Circle>
					<Heading
						as="h3"
						size={isLarge ? "xl" : "lg"}
						fontWeight="semibold"
						color="fg"
						fontFamily="var(--font-bricolage)"
					>
						{title}
					</Heading>
					<Text
						color="fg.muted"
						lineHeight="relaxed"
						fontSize={isLarge ? "md" : "sm"}
						flex={1}
					>
						{description}
					</Text>

					{/* Mock editor interface - only for Rich Text Editor */}
					{showMockEditor && (
						<Box
							bg="bg"
							rounded="lg"
							p={4}
							border="1px"
							borderColor="gray.200"
							w="full"
						>
							<Stack
								direction="row"
								mb={3}
								pb={2}
								borderBottom="1px"
								borderColor="gray.200"
								gap={2}
							>
								<Circle
									size="2"
									bg="gray.400"
								/>
								<Circle
									size="2"
									bg="gray.400"
								/>
								<Circle
									size="2"
									bg="gray.400"
								/>
							</Stack>
							<Stack
								direction="column"
								align="start"
								gap={2}
							>
								<Skeleton
									height="12px"
									width="33%"
									bg="gray.900"
								/>
								<Skeleton
									height="8px"
									width="100%"
									bg="gray.300"
								/>
								<Skeleton
									height="8px"
									width="80%"
									bg="gray.300"
								/>
								<Code
									fontSize="xs"
									bg="gray.400"
									width="66%"
								>
									<Skeleton height="8px" />
								</Code>
							</Stack>
						</Box>
					)}

					{/* Search box - for Instant search card */}
					{showSearchBox && (
						<Box
							bg="gray.50"
							rounded="md"
							px={3}
							py={2}
							border="1px"
							borderColor="gray.200"
							w="full"
						>
							<Skeleton
								height="8px"
								width="66%"
								bg="gray.300"
							/>
						</Box>
					)}

					{/* Collaboration avatars - for Live collaboration card */}
					{showCollabAvatars && (
						<Stack
							direction="row"
							gap="-1"
						>
							<Circle
								size={5}
								bg="gray.400"
								border="2px"
								borderColor="white"
							/>
							<Circle
								size={5}
								bg="gray.600"
								border="2px"
								borderColor="white"
							/>
							<Circle
								size={5}
								bg="gray.800"
								border="2px"
								borderColor="white"
							/>
						</Stack>
					)}

					{/* Tags - for Works everywhere card */}
					{showTags && tags.length > 0 && (
						<Stack
							direction="row"
							gap={2}
						>
							{tags.map((tag, index) => (
								<Tag.Root
									key={index}
									size="lg"
									// variant={"surface"}
									rounded={"md"}
									bg={"bg.emphasized"}
								>
									<Tag.Label>{tag}</Tag.Label>
								</Tag.Root>
							))}
						</Stack>
					)}

					{/* Custom children content */}
					{children}
				</Stack>
			</Card.Body>
		</Card.Root>
	)
}
