"use client"
import { isSidebarCollapsed } from "@/modules/atoms"
import { IconButton, Input, InputGroup, Kbd, Show } from "@chakra-ui/react"
import { useAtomValue } from "jotai/react"
import { LuSearch } from "react-icons/lu"
import { useCommandSearchContext } from "../../contexts/command-search-context"

const SidebarSearchButton = () => {
	const isSidebarOpen = useAtomValue(isSidebarCollapsed)
	const { openMenu } = useCommandSearchContext()

	// Safe platform detection
	const getMetaKey = () => {
		if (typeof window === "undefined") return "⌘"
		const platform = navigator.platform || navigator.userAgent
		return platform.toLowerCase().includes("win") ? "Ctrl" : "⌘"
	}

	const metaKey = getMetaKey()

	const handleSearchClick = () => {
		console.log("Search clicked - opening command menu")
		openMenu()
	}

	return (
		<>
			{/* Full search input for expanded sidebar */}
			<Show when={!isSidebarOpen}>
				<InputGroup
					startElement={<LuSearch />}
					endElement={<Kbd>{metaKey} k</Kbd>}
				>
					<Input
						placeholder="Search notes"
						variant="subtle"
						rounded={"xl"}
						size="sm"
						height={"40px"}
						color={"fg"}
						bg="bg.emphasized"
						cursor="pointer"
						readOnly
						onClick={handleSearchClick}
						_focus={{
							outline: "none",
							borderColor: "colorPalette.500",
						}}
						_hover={{
							bg: "bg.muted",
						}}
					/>
				</InputGroup>
			</Show>

			{/* Compact search icon for collapsed state */}
			<Show when={isSidebarOpen}>
				<IconButton
					aria-label="Search"
					variant="subtle"
					size="xs"
					title="Search"
					color={"fg"}
					rounded={"l3"}
					onClick={handleSearchClick}
					_hover={{
						bg: "bg.emphasized",
					}}
					w={"fit"}
				>
					<LuSearch />
				</IconButton>
			</Show>
		</>
	)
}

export default SidebarSearchButton
