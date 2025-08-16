import { Input, Text } from "@chakra-ui/react"
import * as Clerk from "@clerk/elements/common"

interface AuthFieldProps {
	name: string
	type?: string
	placeholder: string
	label: string
}

export const AuthField = ({
	name,
	type = "text",
	placeholder,
	label,
}: AuthFieldProps) => {
	return (
		<Clerk.Field name={name}>
			<Clerk.Label className="sr-only">{label}</Clerk.Label>
			<Clerk.Input
				asChild
				type={type}
				required
			>
				<Input
					placeholder={placeholder}
					variant="subtle"
					color={"fg"}
					_invalid={{ borderColor: "red.500", color: "red.500" }}
					py={2}
					rounded={"xl"}
				/>
			</Clerk.Input>
			<Clerk.FieldError asChild>
				<Text
					fontSize="xs"
					color="red.500"
					mt={1}
				/>
			</Clerk.FieldError>
		</Clerk.Field>
	)
}
