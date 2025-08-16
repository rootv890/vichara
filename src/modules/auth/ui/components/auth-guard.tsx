"use client"

import { BouncyLoading } from "@/components/loadings"
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
					<BouncyLoading label="Making sure everything is in order..." />
				</AuthLayout>
			</AuthLoading>
			<Authenticated>{children}</Authenticated>
			<Unauthenticated>
				{/* <AuthLayout>
					<SignInView />
				</AuthLayout> */}
				{children}
			</Unauthenticated>
		</>
	)
}

export default AuthGuard
