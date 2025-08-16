import { Text } from "@chakra-ui/react"
import { Bouncy } from "ldrs/react"
import "ldrs/react/Bouncy.css"
import { cn } from "../lib/utils"

interface BouncyLoadingProps {
	color?: string
	speed?: number
	size?: number
	label?: string
	direction?: "vertical" | "horizontal"
	takeFullScreen?: boolean
}
export const BouncyLoading = ({
	color = "var(--chakra-colors-fg)",
	speed = 1.6,
	size = 55,
	label,
	direction = "vertical",
	takeFullScreen = false,
}: BouncyLoadingProps) => {
	return (
		<div
			className={cn(
				"flex items-center justify-center",
				direction === "vertical" ? "flex-col" : "flex-row",
				takeFullScreen && "fixed h-screen w-full bg-background"
			)}
		>
			<Bouncy
				color={color}
				speed={speed}
				size={size}
			/>
			{label && (
				<Text
					as={"span"}
					color={"fg"}
					fontSize={"lg"}
					fontFamily={"var(--font-bricolage)"}
				>
					{label}
				</Text>
			)}
		</div>
	)
}
