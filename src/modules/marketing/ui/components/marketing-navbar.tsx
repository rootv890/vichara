"use client"
import { ColorModeButton } from "@/components/ui/color-mode"
import { cn } from "@/lib/utils"
import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import React from "react"
import { LuArrowRight } from "react-icons/lu"
import { transform } from "zod"
import { useScrollTop } from "../../hooks/use-scroll-top"

type Props = {}

function MarketingNavbar({}: Props) {
	const scrolled = useScrollTop()
	const { theme } = useTheme()
	return (
		<Box
			className={cn("", {
				"shadow-2xs  border-b": scrolled,
			})}
			w={"full"}
			pos={"fixed"}
			p={"6"}
			zIndex={50}
			justifyContent={"space-between"}
			alignItems={"center"}
			// scrolled
			color={"bg"}
			bg={"bg"}
		>
			<Stack
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
				gap={4}
			>
				<Flex
					gapX={"3"}
					alignItems={"center"}
					justify={"center"}
				>
					<Image
						src={theme === "dark" ? "/logo-white.svg" : "/logo-dark.svg"}
						alt="Logo"
						width={32}
						height={32}
						className="transition-all ease-in-out duration-300 "
					/>
					<Text
						fontFamily={"var(--font-bricolage)"}
						fontWeight={"bold"}
						fontSize={"xl"}
						lineHeight={"unset"}
						color={"fg"}
					>
						Vichara
					</Text>
				</Flex>
				<Box>
					<ColorModeButton
						size={"sm"}
						mr={2}
						p={"16px"}
						rounded={"lg"}
					/>

					{/* auth based button */}
					<Button
						size="sm"
						_hover={{ bg: "gray.800" }}
						px={4}
						py={4}
						rounded="lg"
						transition="all 0.2s"
						role="group"
					>
						{/* Sign Up or Login or Continue */}
						Continue
						<Icon
							as={LuArrowRight}
							transition="all 0.2s"
							ml={2}
							_groupHover={{
								transform: "translateX(12px)",
								color: "blue.500",
							}}
						/>
					</Button>
				</Box>
			</Stack>
		</Box>
	)
}

export default MarketingNavbar
