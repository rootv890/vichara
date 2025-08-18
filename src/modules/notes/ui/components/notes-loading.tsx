"use client"

import { QuantumLoading } from "@/components/loadings"
import { Box, Text, VStack } from "@chakra-ui/react"
import { Orbit } from "ldrs/react"
import React from "react"

interface NotesLoadingProps {
	message?: string
	size?: number
	takeFullScreen?: boolean
}

const NotesLoading: React.FC<NotesLoadingProps> = ({
	message = "Loading...",
	size = 100,
	takeFullScreen,
}) => {
	return (
		<VStack
			bg={takeFullScreen ? "bg" : "transparent"}
			w={takeFullScreen ? "full" : "auto"}
			h={takeFullScreen ? "full" : "auto"}
			justify={"center"}
			align={"center"}
		>
			<QuantumLoading
				label={message}
				size={size}
			/>
		</VStack>
	)
}

export default NotesLoading
