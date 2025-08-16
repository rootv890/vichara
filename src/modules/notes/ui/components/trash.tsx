import { DestructiveButton } from "@/components/ui/button"
import { isSidebarCollapsed } from "@/modules/atoms"
import { useAtomValue } from "jotai/react"
import Link from "next/link"
import React from "react"
import { LuTrash2 } from "react-icons/lu"

type Props = {}

const Trash = (props: Props) => {
	const isCollapsed = useAtomValue(isSidebarCollapsed)
	return (
		<DestructiveButton
			mt="auto"
			w="full"
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
