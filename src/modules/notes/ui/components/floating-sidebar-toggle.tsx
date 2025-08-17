"use client"

import { Button } from "@/components/ui/button"
import { gutterWidthAtom } from "@/modules/atoms"
import { Box } from "@chakra-ui/react"
import { useAtomValue, useSetAtom } from "jotai/react"
import { TbMenu } from "react-icons/tb"

type Props = {
	onToggle: () => void
	isVisible: boolean
}

const FloatingSidebarToggle = ({ onToggle, isVisible }: Props) => {
	const gutterWidth = useAtomValue(gutterWidthAtom)
	const setGutterWidth = useSetAtom(gutterWidthAtom)

	// in not-collapsed state calculate the width of the floating sidebar toggle + some padding

	if (!isVisible) return null

	return (
		<Box
			ref={(el: HTMLDivElement | null) => {
				if (el) {
					if (!isVisible) {
						return
					}
					const { x, width } = el.getBoundingClientRect()
					setGutterWidth(width + x + 16)
					console.log("Floating Sidebar Toggle Position:", { x, width })
				}
			}}
			position="fixed"
			top="3"
			left="3"
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
