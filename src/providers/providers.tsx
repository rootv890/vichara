"use client"

import { ColorModeProvider as ThemeProvider } from "@/components/ui/color-mode"
import { Provider as ChakraProvider } from "@/components/ui/provider"

import AuthGuard from "@/modules/auth/ui/components/auth-guard"
import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ReactNode } from "react"

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
	throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file")
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk
				client={convex}
				useAuth={useAuth}
			>
				<ChakraProvider>
					<ThemeProvider>
						{/* TODO shift auth-guard to one layer down */}
						<AuthGuard>{children}</AuthGuard>
					</ThemeProvider>
				</ChakraProvider>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}
