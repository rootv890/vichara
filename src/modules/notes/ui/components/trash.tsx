"use client"
import { DestructiveButton } from "@/components/ui/button"
import { isSidebarCollapsed } from "@/modules/atoms"
import { useAtomValue } from "jotai/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { LuTrash2 } from "react-icons/lu"

type Props = {}

const Trash = (props: Props) => {
	const isCollapsed = useAtomValue(isSidebarCollapsed)
	const pathname = usePathname()
	return (
		<DestructiveButton
			mt="auto"
			w="full"
			bg={"bg"}
			borderColor={pathname.includes("/notes/trash") ? "fg" : "transparent"}
			color={"fg"}
			_hover={{
				bg: "bg.subtle",
				color: "fg.warning",
				borderColor: "fg.warning",
			}}
			variant="ghost"
			size="md"
			gap={2}
			flexDir={isCollapsed ? "column" : "row"}
			justifyContent={isCollapsed ? "center" : "flex-start"}
			alignItems="center"
			fontWeight="medium"
			asChild
		>
			<Link
				href={"/notes/trash"}
				className="w-full"
			>
				<LuTrash2 className="size-4" />
				{isCollapsed ? null : "Trash"}
			</Link>
		</DestructiveButton>
	)
}

export default Trash
