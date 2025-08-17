"use client"

import { BouncyLoading } from "@/components/loadings"
import { Box } from "@chakra-ui/react"
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react"
import { AuthLayout } from "../layouts/auth-layout"
import { SignInView } from "../views/sign-in-view"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AuthLoading>
				<AuthLayout>
					<Box>
						<BouncyLoading label="Making sure everything is in order..." />
					</Box>
				</AuthLayout>
			</AuthLoading>
			<Authenticated>{children}</Authenticated>
			<Unauthenticated>
				<AuthLayout>
					<SignInView />
				</AuthLayout>
				{children}
			</Unauthenticated>
		</>
	)
}

export default AuthGuard
