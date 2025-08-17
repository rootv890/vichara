"use client"
import { Box, Container, Theme, VStack } from "@chakra-ui/react"
import { useTheme } from "next-themes"
import React from "react"

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const { theme } = useTheme()
	return (
		<Theme appearance={theme === "light" ? "light" : "dark"}>
			<VStack
				w={"full"}
				h={"full"}
				className="flex items-center justify-center w-full min-h-screen"
			>
				{children}
			</VStack>
		</Theme>
	)
}
