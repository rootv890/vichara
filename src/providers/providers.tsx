"use client"

import { Provider as ChakraProvider } from "@/components/ui/provider"

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { Provider as JotaiProvider } from "jotai/react"
import { ReactNode } from "react"

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
	throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file")
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<JotaiProvider>
			<ConvexProviderWithClerk
				client={convex}
				useAuth={useAuth}
			>
				<ChakraProvider>
					{/* Color mode is now handled internally by Chakra UI */}
					{children}
				</ChakraProvider>
			</ConvexProviderWithClerk>
		</JotaiProvider>
	)
}
