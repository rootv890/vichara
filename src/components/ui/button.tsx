"use client"

import {
	Button as ChakraButton,
	IconButton as ChakraIconButton,
} from "@chakra-ui/react"
import { forwardRef } from "react"

export interface ButtonProps
	extends React.ComponentProps<typeof ChakraButton> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(props, ref) {
		return (
			<ChakraButton
				ref={ref}
				{...props}
			/>
		)
	}
)

export interface IconButtonProps
	extends React.ComponentProps<typeof ChakraIconButton> {}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(props, ref) {
		return (
			<ChakraIconButton
				ref={ref}
				{...props}
			/>
		)
	}
)

// Convenience components for specific purposes
export const DestructiveButton = forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, "colorPalette">
>(function DestructiveButton(props, ref) {
	return (
		<Button
			ref={ref}
			colorPalette="red"
			{...props}
		/>
	)
})

export const SuccessButton = forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, "colorPalette">
>(function SuccessButton(props, ref) {
	return (
		<Button
			ref={ref}
			colorPalette="green"
			{...props}
		/>
	)
})
