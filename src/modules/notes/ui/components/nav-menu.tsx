"use client"

import { Button, Menu, Portal } from "@chakra-ui/react"
import React from "react"
import { LuEllipsis } from "react-icons/lu"

const NavMenu = () => {
	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Menu.ContextTrigger asChild>
					<Button
						variant="subtle"
						size="sm"
						border={"1px solid var(--chakra-colors-border)"}
					>
						<LuEllipsis />
					</Button>
				</Menu.ContextTrigger>
			</Menu.Trigger>

			<Portal>
				<Menu.Positioner>
					<Menu.Content
						rounded={"xl"}
						bg={"bg.panel"}
						shadow={"md"}
					>
						<Menu.Item value="new-txt">
							New Text File <Menu.ItemCommand>⌘E</Menu.ItemCommand>
						</Menu.Item>
						<Menu.Item value="new-file">
							New File... <Menu.ItemCommand>⌘N</Menu.ItemCommand>
						</Menu.Item>
						<Menu.Item value="new-win">
							New Window <Menu.ItemCommand>⌘W</Menu.ItemCommand>
						</Menu.Item>
						<Menu.Item value="open-file">
							Open File... <Menu.ItemCommand>⌘O</Menu.ItemCommand>
						</Menu.Item>
						<Menu.Item value="export">
							Export <Menu.ItemCommand>⌘S</Menu.ItemCommand>
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	)
}

export default NavMenu
