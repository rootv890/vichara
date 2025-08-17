"use client"

import { useColorModeValue } from "@/components/ui/color-mode"
import {
	Box,
	HStack,
	Kbd,
	Separator,
	Text,
	VisuallyHidden,
} from "@chakra-ui/react"
import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import * as React from "react"
import { IconType } from "react-icons"

export interface CommandAction {
	id: string
	label: string
	icon: IconType
	shortcut?: string
	action: () => void | Promise<void>
}

export interface CommandGroup {
	id: string
	label: string
	items: CommandItem[]
}

export interface CommandItem {
	id: string
	title: string
	subtitle?: string
	icon?: string | React.ReactNode
	route?: string
	action?: () => void | Promise<void>
	metadata?: Record<string, unknown>
}

export interface CommandSearchProps {
	/**
	 * Whether the command menu is open
	 */
	open: boolean
	/**
	 * Callback when the command menu open state changes
	 */
	onOpenChange: (open: boolean) => void
	/**
	 * Placeholder text for the search input
	 */
	placeholder?: string
	/**
	 * Actions that appear at the top of the command menu
	 */
	actions?: CommandAction[]
	/**
	 * Groups of items to display in the command menu
	 */
	groups?: CommandGroup[]
	/**
	 * Custom keyboard shortcuts to handle when the menu is open
	 */
	shortcuts?: Record<string, () => void | Promise<void>>
	/**
	 * Custom empty state message
	 */
	emptyMessage?: string
	/**
	 * Whether to show the footer with keyboard shortcuts
	 */
	showFooter?: boolean
	/**
	 * Custom footer content
	 */
	footerContent?: React.ReactNode
}

export const CommandSearch: React.FC<CommandSearchProps> = ({
	open,
	onOpenChange,
	placeholder = "Type a command or search...",
	actions = [],
	groups = [],
	shortcuts = {},
	emptyMessage,
	showFooter = true,
	footerContent,
}) => {
	const [search, setSearch] = React.useState("")
	const router = useRouter()

	const ItemStyle = {
		padding: "0",
		borderRadius: "6px",
		cursor: "pointer",
		margin: "1px 0",
		color: "var(--chakra-colors-fg)",
	} as React.CSSProperties

	// Handle keyboard shortcuts
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			// Toggle with ⌘K / Ctrl+K
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				onOpenChange(!open)
			}

			// Handle custom shortcuts when command menu is open
			if (open) {
				// Check if the target is an input element to avoid triggering shortcuts while typing
				const target = e.target as HTMLElement
				const isInputFocused =
					target?.tagName === "INPUT" ||
					target?.tagName === "TEXTAREA" ||
					target?.isContentEditable

				if (!isInputFocused) {
					// Handle custom shortcuts
					Object.entries(shortcuts).forEach(([key, handler]) => {
						if (e.key === key && !e.metaKey && !e.ctrlKey && !e.altKey) {
							e.preventDefault()
							handler()
							onOpenChange(false)
						}
					})
				}
			}
		}
		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [open, onOpenChange, shortcuts])

	const handleItemSelect = (item: CommandItem) => {
		if (item.action) {
			item.action()
		} else if (item.route) {
			router.push(item.route)
		}
		onOpenChange(false)
	}

	const handleActionSelect = (action: CommandAction) => {
		action.action()
		onOpenChange(false)
	}

	// Color mode values
	const borderColor = useColorModeValue("gray.200", "gray.700")
	const bgColor = useColorModeValue("white", "gray.800")
	const inputBg = useColorModeValue("white", "gray.700")
	const inputBorder = useColorModeValue("gray.200", "gray.600")
	const inputTextColor = useColorModeValue("gray.900", "white")
	const groupTitleColor = useColorModeValue("gray.600", "gray.400")
	const itemHoverBg = useColorModeValue("gray.200", "bg.subtle")
	const textColor = useColorModeValue("gray.900", "white")
	const subtleTextColor = useColorModeValue("gray.500", "fg.subtle")
	const kbdBg = useColorModeValue("gray.100", "gray.600")
	const kbdColor = useColorModeValue("gray.600", "gray.300")
	const footerBg = useColorModeValue("gray.50", "gray.700")
	const iconColor = useColorModeValue("gray.500", "gray.400")

	return (
		<Command.Dialog
			open={open}
			onOpenChange={onOpenChange}
			label="Command Menu"
			style={{
				position: "fixed",
				top: "0",
				left: "0",
				right: "0",
				bottom: "0",
				zIndex: 9999,
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "center",
				paddingTop: "10vh",
				backgroundColor: "rgba(0, 0, 0, 0.4)",
				borderRadius: "24px !important",
			}}
			suppressHydrationWarning
		>
			<VisuallyHidden asChild>
				<h2>Command Menu</h2>
			</VisuallyHidden>
			<Box
				bg={bgColor}
				borderRadius="12px"
				boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
				border="1px solid"
				borderColor={borderColor}
				w="640px"
				maxW="90vw"
				maxH="70vh"
				overflow="hidden"
				display="flex"
				flexDirection="column"
			>
				{/* Search input */}
				<Box
					p={4}
					gap={2}
					borderBottom={".8px solid var(--chakra-colors-fg-subtle)"}
				>
					<Command.Input
						placeholder={placeholder}
						value={search}
						onValueChange={setSearch}
						style={{
							padding: "12px 16px",
							fontSize: "18px",
							borderRadius: "16px",
							outline: "none",
							border: `1px solid var(--chakra-colors-fg-subtle)`,
							background: `var(--chakra-colors-bg-subtle)`,
							color: `var(--chakra-colors-fg)`,
							width: "100%",
							fontFamily: "inherit",
						}}
					/>
				</Box>

				{/* Results */}
				<Command.List
					style={{
						padding: "8px",
						maxHeight: "400px",
						overflow: "auto",
					}}
				>
					<Command.Empty>
						<Box
							p={8}
							textAlign="center"
						>
							<Text
								color={subtleTextColor}
								fontSize="sm"
							>
								{emptyMessage || `No results found for "${search}"`}
							</Text>
						</Box>
					</Command.Empty>

					{/* Actions Group */}
					{actions.length > 0 && (
						<Command.Group aria-label="Actions">
							<Box mb={2}>
								<Text
									fontSize="xs"
									fontWeight="600"
									color={groupTitleColor}
									px={3}
									py={2}
									textTransform="uppercase"
									letterSpacing="wider"
								>
									Actions
								</Text>
							</Box>
							{actions.map((action) => (
								<Command.Item
									key={action.id}
									value={action.label}
									onSelect={() => handleActionSelect(action)}
									style={ItemStyle}
								>
									<HStack
										w="full"
										px={3}
										py={2}
										justify="space-between"
										align="center"
										borderRadius="6px"
										h={"fit"}
										_hover={{ bg: itemHoverBg }}
										transition="background 0.1s ease"
										gap={3}
									>
										<HStack gap={3}>
											<Box color={iconColor}>
												<action.icon size={16} />
											</Box>
											<Text
												fontSize="sm"
												fontWeight="500"
												color={textColor}
											>
												{action.label}
											</Text>
										</HStack>
										{action.shortcut && (
											<Kbd
												fontSize="xs"
												bg={kbdBg}
												color={kbdColor}
											>
												{action.shortcut}
											</Kbd>
										)}
									</HStack>
								</Command.Item>
							))}
						</Command.Group>
					)}

					{/* Custom Groups */}
					{groups.map((group, groupIndex) => (
						<Command.Group
							key={group.id}
							// heading={group.label}
							aria-label={group.label}
						>
							<Box
								mb={2}
								mt={groupIndex > 0 || actions.length > 0 ? 4 : 0}
							>
								<Text
									fontSize="xs"
									fontWeight="600"
									color={groupTitleColor}
									px={3}
									py={2}
									textTransform="uppercase"
									letterSpacing="wider"
								>
									{group.label}
								</Text>
							</Box>
							{group.items.map((item) => (
								<Command.Item
									key={item.id}
									value={`${item.title} ${item.subtitle || ""}`}
									onSelect={() => handleItemSelect(item)}
									style={ItemStyle}
								>
									<HStack
										w="full"
										px={3}
										py={2}
										gap={3}
										borderRadius="6px"
										h={"fit"}
										_hover={{ bg: itemHoverBg }}
										transition="background 0.1s ease"
									>
										{item.icon && (
											<Box
												color={iconColor}
												fontSize="sm"
											>
												{typeof item.icon === "string" ? (
													<div
														dangerouslySetInnerHTML={{
															__html: item.icon,
														}}
													/>
												) : (
													item.icon
												)}
											</Box>
										)}
										<HStack
											align="start"
											gap={0}
											flex={1}
											justify={"space-between"}
										>
											<Text
												fontSize="sm"
												fontWeight="500"
												truncate
												color={textColor}
											>
												{item.title || "Untitled"}
											</Text>
											{item.subtitle && (
												<Text
													fontSize="xs"
													color={subtleTextColor}
													truncate
												>
													{item.subtitle}
												</Text>
											)}
										</HStack>
									</HStack>
								</Command.Item>
							))}
						</Command.Group>
					))}
				</Command.List>

				{/* Footer */}
				{showFooter && (
					<Box
						px={3}
						py={2}
						borderTop="1px solid"
						borderColor={borderColor}
						bg={footerBg}
					>
						{footerContent || (
							<HStack
								justify="space-between"
								align="center"
							>
								<HStack
									gap={2}
									fontSize="xs"
									color={subtleTextColor}
								>
									<HStack gap={1}>
										<Kbd
											fontSize="xs"
											bg={kbdBg}
											color={kbdColor}
										>
											↑↓
										</Kbd>
										<Text>to navigate</Text>
									</HStack>
									<HStack gap={1}>
										<Kbd
											fontSize="xs"
											bg={kbdBg}
											color={kbdColor}
										>
											↵
										</Kbd>
										<Text>to select</Text>
									</HStack>
									<HStack gap={1}>
										<Kbd
											fontSize="xs"
											bg={kbdBg}
											color={kbdColor}
										>
											esc
										</Kbd>
										<Text>to close</Text>
									</HStack>
								</HStack>
							</HStack>
						)}
					</Box>
				)}
			</Box>
		</Command.Dialog>
	)
}

export default CommandSearch
