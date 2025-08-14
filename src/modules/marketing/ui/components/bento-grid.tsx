"use client"
import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react"
import React from "react"
import {
	LuCloud,
	LuCode,
	LuFileText,
	LuGlobe,
	LuLock,
	LuSearch,
	LuSmartphone,
	LuUsers,
} from "react-icons/lu"
import { FeatureCard } from "./feature-card"
export function BentoGrid() {
	return (
		<Box
			py={24}
			bg="bg"
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Container
				maxW="6xl"
				px={6}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Stack
					direction="column"
					textAlign="center"
					mb={16}
					gap={4}
				>
					<Heading
						as="h2"
						size={["2xl", "3xl", "4xl"]}
						fontWeight="bold"
						color="fg"
						fontFamily={"var(--font-bricolage)"}
					>
						Everything you need
					</Heading>
					<Text
						fontSize="xl"
						color="fg.muted"
						maxW="2xl"
						mx="auto"
					>
						Simple, powerful tools for modern note-taking.
					</Text>
				</Stack>

				<SimpleGrid
					columns={[1, 2, 4]}
					gap={4}
				>
					{/* Large feature card - Rich Editor */}
					<FeatureCard
						icon={LuFileText}
						title="Rich text editor"
						description="Write with markdown, embed code blocks, create tables, and format text exactly as you need. Clean, distraction-free interface that gets out of your way."
						isLarge={true}
						showMockEditor={true}
						gridColumn={["1", "1", "1 / 3"]}
						gridRow={["auto", "auto", "1 / 3"]}
					/>

					{/* Live collaboration */}
					<FeatureCard
						icon={LuUsers}
						title="Live collaboration"
						description="Work together in real-time"
						showCollabAvatars={true}
					/>

					{/* Instant search */}
					<FeatureCard
						icon={LuSearch}
						title="Instant search"
						description="Find anything across all your notes"
						showSearchBox={true}
					/>

					{/* Open source */}
					<FeatureCard
						icon={LuCode}
						title="Open source"
						description="Transparent and community-driven"
					/>

					{/* Privacy first */}
					<FeatureCard
						icon={LuLock}
						title="Privacy first"
						description="Your data stays yours"
					/>

					{/* Works everywhere */}
					<FeatureCard
						icon={LuGlobe}
						title="Works everywhere"
						description="Access your notes on any device"
						showTags={true}
						tags={["Web", "Desktop", "Mobile"]}
						gridColumn={["1", "1", "1 / 3"]}
					/>

					{/* Mobile ready */}
					<FeatureCard
						icon={LuSmartphone}
						title="Mobile ready"
						description="Optimized for touch"
					/>
					{/* Local Deployable */}

					<FeatureCard
						icon={LuCloud}
						title="Deploy Anywhere"
						description="Your notes - your infrastructure"
					/>
				</SimpleGrid>
			</Container>
		</Box>
	)
}
