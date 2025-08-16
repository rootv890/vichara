import { Text } from "@chakra-ui/react"
import { Bouncy, Cardio } from "ldrs/react"
import "ldrs/react/Bouncy.css"
import "ldrs/react/Cardio.css"
import { cn } from "../lib/utils"

interface LoadingProps {
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
}: LoadingProps) => {
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

export const CardioLoading = ({
	color = "var(--chakra-colors-fg)",
	speed = 2,
	size = 50,
	label,
	direction = "vertical",
	takeFullScreen,
}: LoadingProps) => {
	return (
		<div
			className={cn(
				"flex items-center justify-center",
				direction === "vertical" ? "flex-col" : "flex-row",
				takeFullScreen && "fixed h-screen w-full bg-background"
			)}
		>
			<Cardio
				size={size}
				stroke="2"
				speed={speed}
				color={color}
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
