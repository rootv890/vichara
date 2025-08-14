"use client"
import {
	Box,
	Button,
	Container,
	Heading,
	Icon,
	Stack,
	Text,
} from "@chakra-ui/react"
import { LuArrowRight, LuDownload, LuGithub } from "react-icons/lu"

export function CTASection() {
	return (
		<Box
			py={24}
			bg="bg"
			borderTop="1px"
			borderColor="gray.200"
		>
			<Container
				maxW="4xl"
				px={6}
				textAlign="center"
			>
				<Heading
					as="h2"
					fontSize={["3xl", "4xl", "5xl"]}
					fontWeight="bold"
					color="fg"
					mb={6}
					fontFamily="var(--font-bricolage)"
				>
					Ready to start writing?
				</Heading>
				<Text
					fontSize="xl"
					color="fg.muted"
					mb={12}
					maxW="2xl"
					mx="auto"
				>
					Join the community building the future of open-source note-taking.
				</Text>

				<Stack
					direction={["column", "row"]}
					gap={4}
					justify="center"
					align="center"
					mb={8}
				>
					<Button
						size="lg"
						_hover={{ bg: "gray.800" }}
						px={8}
						py={4}
						rounded="lg"
						transition="all 0.2s"
					>
						<Icon
							as={LuDownload}
							mr={2}
							boxSize={5}
						/>
						Get started
						<Icon
							as={LuArrowRight}
							ml={2}
							boxSize={5}
						/>
					</Button>
					<Button
						variant="outline"
						size="lg"
						px={8}
						py={4}
						rounded="lg"
						transition="all 0.2s"
					>
						View source
						<Icon
							as={LuGithub}
							mr={2}
							boxSize={5}
						/>
					</Button>
				</Stack>

				<Text
					fontSize="sm"
					color="fg.muted"
				>
					Free forever • Open source • Privacy focused
				</Text>
			</Container>
		</Box>
	)
}
