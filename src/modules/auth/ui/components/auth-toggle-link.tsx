import { LinkButton } from "@/components/ui/link-button"
import { Text } from "@chakra-ui/react"
import * as Clerk from "@clerk/elements/common"

interface AuthToggleLinkProps {
	question: string
	linkText: string
	navigateTo: "sign-in" | "sign-up"
}

export const AuthToggleLink = ({
	question,
	linkText,
	navigateTo,
}: AuthToggleLinkProps) => {
	return (
		<Text
			textAlign="center"
			fontSize="sm"
			color="gray.500"
		>
			{question}{" "}
			<LinkButton
				size={"xs"}
				variant={"ghost"}
				py={"0!important"}
				rounded={"md"}
				asChild
			>
				<Clerk.Link navigate={navigateTo}>{linkText}</Clerk.Link>
			</LinkButton>
		</Text>
	)
}
