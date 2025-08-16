import { Box, Button, Text, VStack } from "@chakra-ui/react"
import * as Clerk from "@clerk/elements/common"
import { FaGithub, FaGoogle } from "react-icons/fa"

interface SocialAuthSectionProps {
	title: string
	signUpMode?: boolean
}

export const SocialAuthSection = ({
	title,
	signUpMode = false,
}: SocialAuthSectionProps) => {
	return (
		<Box
			bg="bg.emphasized"
			rounded="3xl"
			p={5}
		>
			<Text
				textAlign="center"
				fontSize="sm"
				color="fg"
				mb={4}
			>
				{title}
			</Text>
			<VStack gap={2}>
				<Clerk.Connection
					name="github"
					asChild
				>
					<Clerk.Loading>
						{(isLoading) => (
							<Button
								w="full"
								fontSize="sm"
								fontWeight="medium"
								variant={"subtle"}
								rounded={"xl"}
								loading={isLoading}
								disabled={isLoading}
							>
								<FaGithub />
								{signUpMode ? "Sign up with GitHub" : "Login with GitHub"}
							</Button>
						)}
					</Clerk.Loading>
				</Clerk.Connection>
				<Clerk.Connection
					name="google"
					asChild
				>
					<Clerk.Loading>
						{(isLoading) => (
							<Button
								w="full"
								fontSize="sm"
								fontWeight="medium"
								variant={"solid"}
								rounded={"xl"}
								loading={isLoading}
								disabled={isLoading}
							>
								<FaGoogle />
								{signUpMode ? "Sign up with Google" : "Login with Google"}
							</Button>
						)}
					</Clerk.Loading>
				</Clerk.Connection>
			</VStack>
		</Box>
	)
}
