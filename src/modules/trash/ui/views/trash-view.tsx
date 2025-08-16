import { Box } from "@chakra-ui/react"
import React from "react"
import TrashList from "../components/trash-list"

type Props = {}

export const TrashView = (props: Props) => {
	return (
		<Box
			color={"fg"}
			p={10}
		>
			<TrashList />
		</Box>
	)
}
