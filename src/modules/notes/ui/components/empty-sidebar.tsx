import { EmptyState } from "@chakra-ui/react"
import Image from "next/image"

export const EmptyNoteSidebarItem = () => {
	return (
		<EmptyState.Root
			color={"fg"}
			textAlign={"center"}
		>
			<EmptyState.Content gap={2}>
				<EmptyState.Indicator>
					<Image
						src="/illustrations/empty-notes.svg"
						alt="No notes"
						width={100}
						height={100}
					/>
				</EmptyState.Indicator>
				<EmptyState.Title>No notes to show</EmptyState.Title>
				<EmptyState.Description>
					Create one to get started!
				</EmptyState.Description>
			</EmptyState.Content>
		</EmptyState.Root>
	)
}
