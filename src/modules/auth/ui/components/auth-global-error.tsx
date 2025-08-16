import { Box, Text } from "@chakra-ui/react"
import * as Clerk from "@clerk/elements/common"

export const AuthGlobalError = () => {
	return (
		<Clerk.GlobalError asChild>
			<Box
				bg="red.50"
				border="1px solid"
				borderColor="red.200"
				rounded="lg"
				p={3}
			>
				<Text
					fontSize="sm"
					color="red.600"
					fontWeight="medium"
				/>
			</Box>
		</Clerk.GlobalError>
	)
}
