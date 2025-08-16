"use client"
import { LinkButton } from "@/components/ui/link-button"
import { Box, Text } from "@chakra-ui/react"
import * as SignIn from "@clerk/elements/sign-in"
import {
	AuthField,
	AuthGlobalError,
	AuthHeader,
	AuthSubmitButton,
	AuthToggleLink,
	SocialAuthSection,
} from "../components"

export function SignInView() {
	return (
		<Box
			display="grid"
			placeItems="center"
			minH="100vh"
			px={4}
			w={"2xl"}
		>
			<SignIn.Root>
				{/* Step: enter identifier */}
				<SignIn.Step name="start">
					<Box
						w={{ base: "full", sm: "480px", md: "520px" }}
						rounded="2xl"
						shadow="lg"
						p={{ base: 6, sm: 8 }}
						spaceY={4}
						bg={"bg"}
					>
						{/* Header */}
						<AuthHeader title="Sign in to Vichara" />

						{/* Global Error */}
						<AuthGlobalError />

						{/* Email Field */}
						<AuthField
							name="identifier"
							type="email"
							placeholder="Email"
							label="Email"
						/>

						{/* Submit Button */}
						<SignIn.Action
							submit
							asChild
						>
							<AuthSubmitButton>Continue</AuthSubmitButton>
						</SignIn.Action>

						<div className="divider">or</div>

						{/* Social Login Section */}
						<SocialAuthSection title="Alternatively, sign in with these platforms" />

						{/* Sign Up Link */}
						<AuthToggleLink
							question="Don't have an account?"
							linkText="Sign up"
							navigateTo="sign-up"
						/>
					</Box>
				</SignIn.Step>

				{/* Step: enter password */}
				<SignIn.Step name="choose-strategy">
					<Box
						w={{ base: "full", sm: "480px", md: "520px" }}
						rounded="2xl"
						shadow="lg"
						p={{ base: 6, sm: 8 }}
						spaceY={4}
						bg={"bg"}
					>
						{/* Header */}
						<AuthHeader title="Enter your password" />

						{/* Global Error */}
						<AuthGlobalError />

						{/* Password Field */}
						<AuthField
							name="password"
							type="password"
							placeholder="Password"
							label="Password"
						/>

						{/* Submit Button */}
						<SignIn.Action
							submit
							asChild
						>
							<AuthSubmitButton>Sign In</AuthSubmitButton>
						</SignIn.Action>

						{/* Alternative strategies */}
						<Text
							textAlign="center"
							fontSize="sm"
							color="gray.500"
						>
							<SignIn.Action
								navigate="verifications?strategy=email_code"
								asChild
							>
								<LinkButton
									size={"xs"}
									variant={"ghost"}
									py={"0!important"}
									rounded={"md"}
								>
									Forgot your password? Use email code instead
								</LinkButton>
							</SignIn.Action>
						</Text>
					</Box>
				</SignIn.Step>

				{/* Step: Email Verification */}
				<SignIn.Step name="verifications">
					<SignIn.Strategy name="email_code">
						<Box
							w={{ base: "full", sm: "480px", md: "520px" }}
							rounded="2xl"
							shadow="lg"
							p={{ base: 6, sm: 8 }}
							spaceY={4}
							bg={"bg"}
						>
							{/* Header */}
							<AuthHeader
								title="Verify email code"
								subtitle="We sent a verification code to your email"
							/>

							{/* Global Error */}
							<AuthGlobalError />

							{/* Code Field */}
							<AuthField
								name="code"
								type="otp"
								placeholder="Email code"
								label="Email code"
							/>

							{/* Submit Button */}
							<SignIn.Action
								submit
								asChild
							>
								<AuthSubmitButton>Continue</AuthSubmitButton>
							</SignIn.Action>

							{/* Sign Up Link */}
							<AuthToggleLink
								question="Don't have an account?"
								linkText="Sign up"
								navigateTo="sign-up"
							/>
						</Box>
					</SignIn.Strategy>
				</SignIn.Step>
			</SignIn.Root>
		</Box>
	)
}
