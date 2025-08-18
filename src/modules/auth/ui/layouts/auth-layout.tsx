"use client"
import { useColorMode } from "@/components/ui/color-mode"
import { Box, Container, VStack } from "@chakra-ui/react"
import React from "react"

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const { colorMode } = useColorMode()
	return (
		<VStack
			w={"full"}
			h={"full"}
			className="flex items-center justify-center w-full min-h-screen"
		>
			{children}
		</VStack>
	)
}
