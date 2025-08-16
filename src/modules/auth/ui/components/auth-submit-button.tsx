import { Button } from "@chakra-ui/react"
import * as Clerk from "@clerk/elements/common"
import { ReactNode } from "react"

interface AuthSubmitButtonProps {
	children: ReactNode
	loading?: boolean
}

export const AuthSubmitButton = ({
	children,
	loading,
}: AuthSubmitButtonProps) => {
	return (
		<Clerk.Loading>
			{(isLoading) => (
				<Button
					type="submit"
					w="full"
					color="white"
					py={1.5}
					fontSize="sm"
					fontWeight="medium"
					rounded="xl"
					loading={isLoading || loading}
					disabled={isLoading || loading}
				>
					{children}
				</Button>
			)}
		</Clerk.Loading>
	)
}
