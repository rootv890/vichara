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
		borderRadius: "xl", // More modern rounded corners
		fontWeight: "500", // Medium weight for better readability
		transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth easing
		cursor: "pointer",
		textAlign: "center",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "2",
		outline: "none",
		position: "relative",
		overflow: "hidden",
		userSelect: "none",
		// Modern focus ring
		_focusVisible: {
			boxShadow: "0 0 0 2px {colors.bg}, 0 0 0 4px {colors.blue.500}",
			outline: "none",
		},
		_disabled: {
			opacity: 0.6,
			cursor: "not-allowed",
			pointerEvents: "none",
		},
	},
	variants: {
		variant: {
			// Primary/Brand button - the main CTA
			solid: {
				bg: "gray.900",
				color: "white",
				border: "1px solid transparent",
				_hover: {
					bg: "gray.800",
					transform: "translateY(-1px)",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
				},
				_active: {
					bg: "gray.700",
					transform: "translateY(0)",
					boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
				},
				_dark: {
					bg: "white",
					color: "gray.900",
					_hover: {
						bg: "gray.100",
						transform: "translateY(-1px)",
						boxShadow: "0 4px 8px rgba(255, 255, 255, 0.1)",
					},
					_active: {
						bg: "gray.200",
						transform: "translateY(0)",
						boxShadow: "0 2px 4px rgba(255, 255, 255, 0.05)",
					},
				},
			},
			// Secondary button - clean and minimal
			subtle: {
				bg: "bg.muted",
				color: "fg",
				border: "1px solid",
				borderColor: "border.subtle",
				_hover: {
					bg: "bg.subtle",
					borderColor: "border.emphasized",
					transform: "translateY(-1px)",
					boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
				},
				_active: {
					bg: "bg.emphasized",
					transform: "translateY(0)",
					boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
				},
			},
			// Surface button - elevated feel
			surface: {
				bg: "bg.panel",
				color: "fg",
				border: "1px solid",
				borderColor: "border.muted",
				boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
				_hover: {
					bg: "bg.subtle",
					borderColor: "border.subtle",
					transform: "translateY(-1px)",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
				},
				_active: {
					bg: "bg.muted",
					transform: "translateY(0)",
					boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
				},
			},
			// Outline button - professional
			outline: {
				bg: "transparent",
				color: "fg",
				border: "1.5px solid",
				borderColor: "border.emphasized",
				_hover: {
					bg: "bg.subtle",
					borderColor: "fg",
					transform: "translateY(-1px)",
					boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
				},
				_active: {
					bg: "bg.muted",
					borderColor: "fg",
					transform: "translateY(0)",
				},
			},
			// Ghost button - minimal interaction
			ghost: {
				bg: "transparent",
				color: "fg.muted",
				border: "1px solid transparent",
				_hover: {
					bg: "bg.subtle",
					color: "fg",
					transform: "translateY(-1px)",
				},
				_active: {
					bg: "bg.muted",
					transform: "translateY(0)",
				},
			},
			// Plain button - text-like
			plain: {
				bg: "transparent",
				color: "fg.muted",
				border: "none",
				p: "0",
				h: "auto",
				minW: "auto",
				_hover: {
					color: "fg",
					textDecoration: "underline",
				},
				_active: {
					color: "fg.emphasized",
				},
			},
		},
		size: {
			"2xs": { h: "6", px: "2", fontSize: "2xs", minW: "6", gap: "1" },
			xs: { h: "7", px: "2.5", fontSize: "xs", minW: "7", gap: "1.5" },
			sm: { h: "8", px: "3", fontSize: "sm", minW: "8", gap: "2" },
			md: { h: "10", px: "4", fontSize: "sm", minW: "10", gap: "2" },
			lg: { h: "11", px: "5", fontSize: "md", minW: "11", gap: "2.5" },
			xl: { h: "12", px: "6", fontSize: "md", minW: "12", gap: "3" },
			"2xl": { h: "14", px: "8", fontSize: "lg", minW: "14", gap: "3" },
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
