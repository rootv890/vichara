"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			fonts: {
				heading: { value: "var(--font-bricolage)" },
				body: { value: "var(--font-bricolage)" },
			},
		},
	},
})

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={defaultSystem}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	)
}
