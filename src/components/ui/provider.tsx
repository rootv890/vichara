"use client"

import {
	ChakraProvider,
	defineConfig,
	defineTextStyles,
} from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"

import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
	base: {
		borderRadius: "lg", // chunkier, but not pill
		fontWeight: "600", // thicker, fun vibes
		transition: "all 0.18s cubic-bezier(0.2, 0.8, 0.4, 1)", // playful ease
		cursor: "pointer",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "2",
		outline: "none",
		userSelect: "none",

		_focusVisible: {
			boxShadow: "0 0 0 3px var(--chakra-colors-blue-400)",
			outline: "none",
		},
		_disabled: {
			opacity: 0.6,
			cursor: "not-allowed",
		},
	},

	variants: {
		variant: {
			solid: {
				bg: "gray.900",
				color: "white",
				_hover: {
					bg: "gray.800",
					transform: "translateY(-1px) scale(1.02)", // duolingo bounce
				},
				_active: {
					bg: "gray.700",
					transform: "scale(0.98)",
				},
				_dark: {
					bg: "white",
					color: "gray.900",
					_hover: { bg: "gray.100", transform: "translateY(-1px) scale(1.02)" },
					_active: { bg: "gray.200", transform: "scale(0.98)" },
				},
			},

			subtle: {
				bg: "bg.muted",
				color: "fg",
				border: "2px solid", // duolingo = thicker
				borderColor: "border.subtle",
				_hover: {
					bg: "bg.subtle",
					borderColor: "border.emphasized",
					transform: "translateY(-1px) scale(1.02)",
				},
				_active: {
					bg: "bg.emphasized",
					transform: "scale(0.98)",
				},
			},

			outline: {
				bg: "transparent",
				color: "fg",
				border: "2px solid",
				borderColor: "border.emphasized",
				_hover: {
					bg: "bg.subtle",
					borderColor: "fg",
					transform: "translateY(-1px) scale(1.02)",
				},
				_active: {
					bg: "bg.muted",
					transform: "scale(0.98)",
				},
			},

			ghost: {
				bg: "transparent",
				color: "fg.muted",
				border: "2px solid transparent",
				_hover: {
					bg: "bg.subtle",
					color: "fg",
					transform: "translateY(-1px) scale(1.02)",
				},
				_active: {
					bg: "bg.muted",
					transform: "scale(0.98)",
				},
			},

			plain: {
				bg: "transparent",
				color: "fg.muted",
				p: "0",
				h: "auto",
				minW: "auto",
				fontWeight: "500",
				_hover: { color: "fg", textDecoration: "underline" },
				_active: { color: "fg.emphasized" },
			},
		},

		size: {
			sm: { h: "8", px: "3", fontSize: "sm", gap: "2" },
			md: { h: "10", px: "4", fontSize: "md", gap: "2.5" }, // a bit chunkier
			lg: { h: "12", px: "6", fontSize: "lg", gap: "3" },
		},
	},

	defaultVariants: {
		variant: "solid",
		size: "md",
	},
})

const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				heading: { value: "var(--font-bricolage)" },
				body: { value: "var(--font-bricolage)" },
			},
		},
		recipes: {
			button: buttonRecipe,
		},
	},
})
const system = createSystem(defaultConfig, config)

export const textStyles = defineTextStyles({
	headline: {
		value: {
			fontFamily: "var(--font-bricolage)",
		},
	},
})

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={system}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	)
}
