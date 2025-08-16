import { Box, Heading, Text } from "@chakra-ui/react"
import Image from "next/image"

interface AuthHeaderProps {
	title: string
	subtitle?: string
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
	return (
		<Box textAlign="center">
			<Box
				mx="auto"
				w="10"
				h="10"
				rounded="full"
				display="flex"
				alignItems="center"
				justifyContent="center"
				overflow={"clip"}
				mb={4}
			>
				<Image
					src="/logo-dark.svg"
					alt="Vichara Logo"
					width={40}
					height={40}
					className="object-cover"
				/>
			</Box>
			<Heading
				as="h1"
				size="xl"
				fontWeight="medium"
				color="fg"
				fontFamily={"var(--font-bricolage)"}
			>
				{title}
			</Heading>
			{subtitle && (
				<Text
					fontSize="sm"
					color="fg.muted"
					mt={2}
				>
					{subtitle}
				</Text>
			)}
		</Box>
	)
}
