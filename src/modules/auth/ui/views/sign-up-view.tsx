"use client"
import { Box } from "@chakra-ui/react"
import * as SignUp from "@clerk/elements/sign-up"
import {
	AuthField,
	AuthGlobalError,
	AuthHeader,
	AuthSubmitButton,
	AuthToggleLink,
	SocialAuthSection,
} from "../components"

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
						<AuthHeader title="Create your account" />

						{/* Global Error */}
						<AuthGlobalError />

						{/* Email Field */}
						<AuthField
							name="emailAddress"
							type="email"
							placeholder="Email"
							label="Email"
						/>

						{/* Password Field */}
						<AuthField
							name="password"
							type="password"
							placeholder="Password"
							label="Password"
						/>

						{/* CAPTCHA Widget */}
						<Box id="clerk-captcha" />

						{/* Submit Button */}
						<SignUp.Action
							submit
							asChild
						>
							<AuthSubmitButton>Sign Up</AuthSubmitButton>
						</SignUp.Action>

						<div className="divider">or</div>

						{/* Social Login Section */}
						<SocialAuthSection
							title="Sign up with these platforms"
							signUpMode={true}
						/>

						{/* Sign In Link */}
						<AuthToggleLink
							question="Already have an account?"
							linkText="Sign in"
							navigateTo="sign-in"
						/>
					</Box>
				</SignUp.Step>

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
							<AuthHeader
								title="Verify your email"
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
							<SignUp.Action
								submit
								asChild
							>
								<AuthSubmitButton>Verify Email</AuthSubmitButton>
							</SignUp.Action>

							{/* Sign In Link */}
							<AuthToggleLink
								question="Already have an account?"
								linkText="Sign in"
								navigateTo="sign-in"
							/>
						</Box>
					</SignUp.Strategy>
				</SignUp.Step>
			</SignUp.Root>
		</Box>
	)
}
