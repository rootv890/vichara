"use client"
import {
	Box,
	Button,
	Heading,
	Input,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react"
import * as Clerk from "@clerk/elements/common"
import * as SignUp from "@clerk/elements/sign-up"
import Image from "next/image"
import { FaGithub, FaGoogle } from "react-icons/fa"

export const SignUpView = () => {
	return (
		<Box
			display="grid"
			placeItems="center"
			minH="100vh"
			px={4}
			w={"2xl"}
		>
			<SignUp.Root>
				{/* ------------------------- */}
				{/* Step: enter identifier */}
				<SignUp.Step name="start">
					<Box
						w={{ base: "full", sm: "480px", md: "520px" }}
						rounded="2xl"
						shadow="lg"
						p={{ base: 6, sm: 8 }}
						spaceY={4}
						bg={"bg"}
					>
						{/* Header */}
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
								fontWeight="bold"
								fontSize={"2xl"}
								color="fg"
								mb={4}
								fontFamily={"var(--font-bricolage)"}
							>
								Create your account
							</Heading>
						</Box>

						{/* Global Error */}
						<Clerk.GlobalError asChild>
							<Text
								fontSize="sm"
								color="red.500"
							/>
						</Clerk.GlobalError>

						{/* Email Field */}
						<Clerk.Field name="emailAddress">
							<Clerk.Label className="sr-only">Email</Clerk.Label>
							<Clerk.Input
								asChild
								type="email"
								required
							>
								<Input
									placeholder="Email"
									variant="subtle"
									color={"fg"}
									_invalid={{ borderColor: "red.500", color: "red.500" }}
									py={2}
									rounded={"xl"}
								/>
							</Clerk.Input>
							<Clerk.FieldError asChild>
								<Text
									fontSize="xs"
									color="red.500"
								/>
							</Clerk.FieldError>
						</Clerk.Field>

						{/* Password Field */}
						<Clerk.Field name="password">
							<Clerk.Label className="sr-only">Password</Clerk.Label>
							<Clerk.Input
								asChild
								type="password"
								required
							>
								<Input
									placeholder="Password"
									variant="subtle"
									color={"fg"}
									_invalid={{ borderColor: "red.500", color: "red.500" }}
									py={2}
									rounded={"xl"}
								/>
							</Clerk.Input>
							<Clerk.FieldError asChild>
								<Text
									fontSize="xs"
									color="red.500"
									mt={2}
								/>
							</Clerk.FieldError>
						</Clerk.Field>

						{/* Submit Button */}
						<SignUp.Action
							submit
							asChild
						>
							<Button
								w="full"
								color="white"
								py={1.5}
								fontSize="sm"
								fontWeight="medium"
								rounded="xl"
							>
								Sign Up
							</Button>
						</SignUp.Action>

						<div className="divider">or</div>

						{/* Social Login Section */}
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
								Sign up with these platforms
							</Text>
							<VStack gap={2}>
								<Clerk.Connection
									name="github"
									asChild
								>
									<Button
										w="full"
										fontSize="sm"
										fontWeight="medium"
										variant={"subtle"}
										rounded={"xl"}
									>
										<FaGithub />
										Sign up with GitHub
									</Button>
								</Clerk.Connection>
								<Clerk.Connection
									name="google"
									asChild
								>
									<Button
										w="full"
										fontSize="sm"
										fontWeight="medium"
										variant={"solid"}
										rounded={"xl"}
									>
										<FaGoogle />
										Sign up with Google
									</Button>
								</Clerk.Connection>
							</VStack>
						</Box>

						{/* Sign In Link */}
						<Text
							textAlign="center"
							fontSize="sm"
							color="gray.500"
						>
							Already have an account?{" "}
							<Clerk.Link navigate="sign-in">
								<Link
									color="gray.700"
									fontWeight="medium"
									_hover={{ bg: "gray.100" }}
									px={1}
									py={0.5}
									rounded="sm"
								>
									Sign in
								</Link>
							</Clerk.Link>
						</Text>
					</Box>
				</SignUp.Step>

				{/* ------------------------- */}
				{/* Step: Email Verification */}
				<SignUp.Step name="verifications">
					<SignUp.Strategy name="email_code">
						<Box
							w={{ base: "full", sm: "480px", md: "520px" }}
							rounded="2xl"
							shadow="lg"
							p={{ base: 6, sm: 8 }}
							bg={"bg"}
							spaceY={4}
						>
							{/* Header */}
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
									Verify your email
								</Heading>
								<Text
									fontSize="sm"
									color="fg.muted"
									mt={2}
								>
									We sent a verification code to your email
								</Text>
							</Box>

							{/* Global Error */}
							<Clerk.GlobalError asChild>
								<Text
									fontSize="sm"
									color="red.500"
								/>
							</Clerk.GlobalError>

							{/* Code Field */}
							<Clerk.Field name="code">
								<Clerk.Label className="sr-only">Email code</Clerk.Label>
								<Clerk.Input
									asChild
									type="otp"
									required
								>
									<Input
										placeholder="Email code"
										variant="subtle"
										color={"fg"}
										_invalid={{ borderColor: "red.500", color: "red.500" }}
										py={2}
										rounded={"xl"}
									/>
								</Clerk.Input>
								<Clerk.FieldError asChild>
									<Text
										fontSize="xs"
										color="red.500"
										mt={2}
									/>
								</Clerk.FieldError>
							</Clerk.Field>

							{/* Submit Button */}
							<SignUp.Action
								submit
								asChild
							>
								<Button
									w="full"
									color="white"
									py={1.5}
									fontSize="sm"
									fontWeight="medium"
									rounded="lg"
								>
									Verify Email
								</Button>
							</SignUp.Action>

							{/* Sign In Link */}
							<Text
								textAlign="center"
								fontSize="sm"
								color="gray.500"
							>
								Already have an account?{" "}
								<Clerk.Link navigate="sign-in">
									<Link
										color="gray.700"
										fontWeight="medium"
										_hover={{ bg: "gray.100" }}
										px={1}
										py={0.5}
										rounded="sm"
									>
										Sign in
									</Link>
								</Clerk.Link>
							</Text>
						</Box>
					</SignUp.Strategy>
				</SignUp.Step>
			</SignUp.Root>
		</Box>
	)
}
