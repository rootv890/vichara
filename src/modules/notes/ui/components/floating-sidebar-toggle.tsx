"use client"

import { Button } from "@/components/ui/button"
import { Box } from "@chakra-ui/react"
import { TbMenu } from "react-icons/tb"

type Props = {
	onToggle: () => void
	isVisible: boolean
}

const FloatingSidebarToggle = ({ onToggle, isVisible }: Props) => {
	if (!isVisible) return null

	return (
		<Box
			position="fixed"
			top="4"
			left="4"
			zIndex={1300}
			transition="all 0.3s ease-in-out"
		>
			<Button
				size="sm"
				variant="surface"
				onClick={onToggle}
				aria-label="Open sidebar"
				borderRadius="lg"
				shadow="lg"
				_hover={{
					transform: "scale(1.05)",
					shadow: "xl",
				}}
				p="3"
			>
				<TbMenu className="size-5" />
			</Button>
		</Box>
	)
}

export default FloatingSidebarToggle
