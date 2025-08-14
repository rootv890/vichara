"use client"

import { api } from "@convex/_generated/api"
import {
	Authenticated,
	AuthLoading,
	Unauthenticated,
	useQuery,
} from "convex/react"
import { AuthLayout } from "../layouts/auth-layout"
import { SignInView } from "../views/sign-in-view"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AuthLoading>
				<AuthLayout>
					{/* <BouncyLoading label="Setting things up!" /> */}
					<div>Loading.... imagine : BOUNCING</div>
				</AuthLayout>
			</AuthLoading>
			<Authenticated>{children}</Authenticated>
			<Unauthenticated>
				<AuthLayout>
					<SignInView />
				</AuthLayout>
			</Unauthenticated>
		</>
	)
}

export default AuthGuard
