"use client"

import { SignInButton } from "@clerk/nextjs"
import React from "react"

type Props = {}

export const SignInView = (props: Props) => {
	return (
		<div>
			sign-in-view
			<SignInButton />
		</div>
	)
}
