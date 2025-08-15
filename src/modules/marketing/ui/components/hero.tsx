"use client"
import { cn } from "@/lib/utils"
import {
	Box,
	Button,
	Circle,
	Container,
	Flex,
	Heading,
	Highlight,
	Icon,
	Image,
	Mark,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react"
import { SignInButton } from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import {
	LuArrowRight,
	LuGithub,
	LuLogIn,
	LuPencil,
	LuShield,
	LuUsers,
} from "react-icons/lu"

export function HeroSection() {
	const { theme } = useTheme()
	const { isAuthenticated, isLoading } = useConvexAuth()
	return (
		<Box
			position="relative"
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			bg="bg"
		>
			<Container
				maxW="4xl"
				px={6}
				textAlign="center"
			>
				{/* Logo */}
				<Flex
					justify="center"
					align="center"
					mb={12}
				>
					{theme === "dark" ? (
						<Image
							src={"/logo-white.svg"}
							alt="Logo"
							width={28}
							height={28}
							className={cn("transition-all ease-in-out duration-300 ")}
						/>
					) : (
						<Image
							src={"/logo-dark.svg"}
							alt="Logo"
							width={28}
							height={28}
							className={cn("transition-all ease-in-out duration-300 ")}
						/>
					)}
				</Flex>

				{/* Main headline */}
				<Heading
					as="h1"
					fontSize={["4xl", "5xl", "6xl", "7xl"]}
					fontWeight="bold"
					mb={6}
					lineHeight="initial"
					fontFamily={"var(--font-bricolage)"}
					color={"fg"}
				>
					Think clearly.
					<br />
					<Text
						as="span"
						color={"fg"}
					>
						{/* <Highlight

							query={"freely."}
						>
							Write freely.
						</Highlight> */}
						Write{" "}
						<Mark
							bg={"blue.subtle"}
							pr={0}
							skewX={20}
							willChange={"transform"}
							border={2}
							className="cursor-marker"
						>
							freely
						</Mark>
					</Text>
				</Heading>

				{/* Subheadline */}
				<Text
					fontSize={["lg", "xl", "2xl"]}
					color="gray.600"
					mb={12}
					maxW="2xl"
					mx="auto"
					lineHeight="relaxed"
				>
					Open-source note-taking that respects your privacy and enhances your
					thinking.
				</Text>

				{/* CTA Buttons */}
				<Stack
					direction={["column", "row"]}
					gap={4}
					justify="center"
					align="center"
					mb={16}
				>
					{isLoading && (
						<Spinner
							size={"md"}
							color="fg"
						/>
					)}

					{isAuthenticated && !isLoading && (
						<Button
							variant="solid"
							size="lg"
							px={8}
							py={4}
							rounded="lg"
							transition="all 0.2s"
							asChild
						>
							<Link href="/notes">
								Continue Vichara
								<Icon
									as={LuArrowRight}
									ml={2}
								/>{" "}
							</Link>
						</Button>
					)}
					{!isAuthenticated && !isLoading && (
						<SignInButton>
							<Button
								variant="solid"
								size="lg"
								px={8}
								py={4}
								rounded="lg"
								transition="all 0.2s"
							>
								Get Vichara
								<LuLogIn />
							</Button>
						</SignInButton>
					)}

					<Button
						variant="outline"
						size="lg"
						px={8}
						py={4}
						rounded="lg"
						transition="all 0.2s"
						bg="transparent"
					>
						View on GitHub
						<Icon
							as={LuGithub}
							ml={2}
						/>
					</Button>
				</Stack>

				{/* Feature highlightHighlights */}
				<Flex
					wrap="wrap"
					justify="center"
					gap={8}
					color="gray.500"
				>
					<Flex
						align="center"
						gap={2}
					>
						<Icon
							as={LuPencil}
							boxSize={4}
						/>
						<Text
							fontSize="sm"
							fontWeight={"medium"}
						>
							Rich editor
						</Text>
					</Flex>
					<Flex
						align="center"
						gap={2}
					>
						<Icon
							as={LuUsers}
							boxSize={4}
						/>
						<Text fontSize="sm">Real-time sync</Text>
					</Flex>
					<Flex
						align="center"
						gap={2}
					>
						<Icon
							as={LuShield}
							boxSize={4}
						/>
						<Text fontSize="sm">Privacy first</Text>
					</Flex>
				</Flex>
			</Container>

			{/* Minimal geometric elements */}
			<Circle
				position="absolute"
				top="25%"
				left={8}
				size={2}
				bg="gray.300"
				opacity={0.6}
			/>
			<Circle
				position="absolute"
				bottom="33%"
				right={12}
				size={1}
				bg="gray.400"
				opacity={0.4}
			/>
			<Circle
				position="absolute"
				top="50%"
				right={8}
				size={1.5}
				bg="gray.300"
				opacity={0.5}
			/>
		</Box>
	)
}
