"use client"
import { ColorModeButton } from "@/components/ui/color-mode"
import { cn } from "@/lib/utils"
import { Box, Button, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { LuArrowRight, LuLogIn } from "react-icons/lu"
import { transform } from "zod"
import { useScrollTop } from "../../hooks/use-scroll-top"

type Props = {}

function MarketingNavbar({}: Props) {
	const scrolled = useScrollTop()
	const { isAuthenticated, isLoading } = useConvexAuth()
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
						src={"/logo-white.svg"}
						alt="Logo"
						width={32}
						height={32}
						className={cn(
							"transition-all ease-in-out duration-300 ",
							theme === "light" && "!hidden"
						)}
					/>
					<Image
						src={"/logo-dark.svg"}
						alt="Logo"
						width={32}
						height={32}
						className={cn(
							"transition-all ease-in-out duration-300 ",
							theme === "dark" && "!hidden"
						)}
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
				<Box
					alignItems={"center"}
					display={"flex"}
					gap={3}
				>
					<ColorModeButton
						size={"sm"}
						// mr={2}
						p={"16px"}
						rounded={"lg"}
					/>

					{/* auth based button */}
					{isAuthenticated && <UserButton />}
					<Button
						size="sm"
						px={4}
						py={4}
						rounded="lg"
						transition="all 0.2s"
						role="group"
						disabled={isLoading}
						asChild
					>
						<Link href="/notes">
							{/* Sign Up or Login or Continue */}
							{isLoading ? (
								<Spinner
									size={"sm"}
									color="blue.500"
									animationDuration="0.8s"
								/>
							) : isAuthenticated ? (
								"Continue Vichara"
							) : (
								<SignInButton>Sign Up</SignInButton>
							)}

							<Icon
								as={isAuthenticated ? LuArrowRight : LuLogIn}
								transition="all 0.2s"
								ml={2}
								_groupHover={{
									transform: "translateX(12px)",
									color: "blue.500",
								}}
							/>
						</Link>
					</Button>
				</Box>
			</Stack>
		</Box>
	)
}

export default MarketingNavbar
