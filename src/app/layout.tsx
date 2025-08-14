import Providers from "@/providers/providers"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const bricolage = Bricolage_Grotesque({
	variable: "--font-bricolage",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Vichara",
	description: "A modern note-taking application",
	icons: {
		icon: [
			{
				media: "prefer-color-scheme:light",
				url: "/logo-dark.svg",
				href: "/logo-dark.svg",
			},
			{
				media: "prefer-color-scheme:dark",
				url: "/logo-light.svg",
				href: "/logo-light.svg",
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={bricolage.variable}
		>
			<head>
				<link
					rel="icon"
					href="/logo-white.svg"
					media="(prefers-color-scheme: dark)"
				/>
				<link
					rel="icon"
					href="/logo-dark.svg"
					media="(prefers-color-scheme: light)"
				/>
			</head>
			<body
				suppressHydrationWarning
				className={`${geistMono.variable} ${bricolage.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
